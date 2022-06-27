<template>
  <q-page class="flex flex-center">
    <div class="container q-mt-sm">
      <canvas class="canvas" ref="canvas"></canvas>

      <div
        v-for="road in roads"
        :key="road.id"
        class="road"
        :style="roadCssCoordinates(road)"
      />
    </div>
  </q-page>
</template>

<style>
.canvas {
  top: 0;
  left: 0;
  position: absolute;
}

.container {
  width: 1280px;
  height: 1024px;
  position: relative;
}

.road {
  width: 12px;
  height: 12px;
  position: absolute;
  border-radius: 100%;
  background-color: #ff0000;
}
</style>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import { loadMapData } from '../model/load';
import canvasBackground from '../assets/images/white_orchard_clean_map.png';

export default defineComponent({
  name: 'HomePage',
  created() {
    const { graph, roads, edges } = loadMapData(false);

    this.graph = graph;
    this.roads = roads;
    this.edges = edges;
  },
  mounted() {
    const { canvas } = this.$refs;

    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;


    this.drawBackgroundImage();
  },

  },
  data() {
    return {
      roads: [],
      edges: [],
      graph: null,
      canvasWidth: 1280,
      canvasHeight: 1024,
      roadCorrection: 5,
    };
  },
  watch: {
    showAllEdges(newValue) {
      this.clearCanvas();

      if (newValue) {
        this.drawBackgroundImage(this.drawAllEdges);
      } else {
        this.drawBackgroundImage();
      }
    },
  },
  computed: mapGetters({
    isBfs: 'isBfs',
    fastTravel: 'fastTravel',
    showAllEdges: 'showAllEdges',
  }),
  methods: {
    drawBackgroundImage(callback = () => true) {
      const { context } = this.getCanvasAndContext();

      const background = new Image();
      background.src = canvasBackground;

      background.onload = () => {
        context.drawImage(background, 0, 0);

        callback();
      };
    },
    drawPath(path) {
      const nodes = this.graph.getAllNodes();

      for (let i = 0; i < path.length; i += 1) {
        if (!path[i + 1]) break;

        this.drawEdge(nodes[path[i]].node, nodes[path[i + 1]].node);
      }
    },
    drawEdge(src, dest) {
      this.drawLine(
        src.coordinates.x,
        src.coordinates.y,
        dest.coordinates.x,
        dest.coordinates.y,
      );
    },
    drawLine(srcX, srcY, destX, destY, color = '#000000') {
      const { context } = this.getCanvasAndContext();

      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = 5;
      context.moveTo(srcX, srcY);
      context.lineTo(destX, destY);
      context.stroke();
    },
    drawAllEdges() {
      this.edges.forEach((edge) => {
        const [start, end] = edge;
        const nodes = this.graph.getAllNodes();

        this.drawEdge(nodes[start].node, nodes[end].node);
      });
    },
    clearCanvas() {
      const { context } = this.getCanvasAndContext();

      context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    },
    roadCssCoordinates(road) {
      return `left: ${road.coordinates.x - this.roadCorrection}px; top: ${road.coordinates.y - this.roadCorrection}px`;
    },
  },
});
</script>
