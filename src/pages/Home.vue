<template>
  <q-page class="flex flex-center">
    <div class="container q-mt-md">
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
    const ctx = canvas.getContext('2d');

    canvas.width = 1280;
    canvas.height = 1024;

    const background = new Image();
    background.src = canvasBackground;

    background.onload = () => {
      ctx.drawImage(background, 0, 0);

      // this.drawPath(this.graph.bfsFromStartToDest('nilfgaardian_garrison', 'poi_29'));

      this.drawAllEdges();
    };
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
  computed: mapGetters({
    isBfs: 'isBfs',
    fastTravel: 'fastTravel',
    showAllEdges: 'showAllEdges',
  }),
  methods: {
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
      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.moveTo(srcX, srcY);
      ctx.lineTo(destX, destY);
      ctx.stroke();
    },
    drawAllEdges() {
      this.edges.forEach((edge) => {
        const [start, end] = edge;
        const nodes = this.graph.getAllNodes();

        this.drawEdge(nodes[start].node, nodes[end].node);
      });
    },
    roadCssCoordinates(road) {
      return `left: ${road.coordinates.x - this.roadCorrection}px; top: ${road.coordinates.y - this.roadCorrection}px`;
    },
  },
});
</script>
