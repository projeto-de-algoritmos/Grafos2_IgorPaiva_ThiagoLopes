<template>
  <q-page class="flex flex-center">
    <div class="container q-mt-sm">
      <canvas class="canvas" ref="canvas">
        <q-tooltip
          v-if="startNode && destNode"
          style="font-size: 12px"
          :delay="1500"
          anchor="top middle"
          self="center middle"
        >
          Clique em qualquer lugar do mapa para desselecionar os nós
        </q-tooltip>
      </canvas>

      <div
        v-for="poi in points_of_interested"
        :key="poi.id"
        class="node poi"
        :style="nodeCss(poi)"
        @click="handleNodeClick(poi)"
      >
        <q-tooltip style="font-size: 12px" v-if="getNodeTooltipMsg(poi.id)">
          {{getNodeTooltipMsg(poi.id)}}
        </q-tooltip>
      </div>

      <div
        v-for="road in roads"
        :key="road.id"
        class="node road"
        :style="nodeCss(road)"
        @click="handleNodeClick(road)"
      >
        <q-tooltip style="font-size: 12px">
          {{getNodeTooltipMsg(road.id)}}
        </q-tooltip>
      </div>
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

.node {
  position: absolute;
  border-radius: 100%;
}

.node:hover {
  opacity: 0.8;
  cursor: pointer;
}

.road {
  width: 12px;
  height: 12px;
  background-color: #AD1D1A;
}

.poi {
  width: 24px;
  height: 24px;
  opacity: 0.5;
  background-color: #8B969C;
}
</style>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import { loadMapData } from '../model/load';
import canvasBackground from '../assets/images/white_orchard_clean_map.png';

const POI_COLOR = '#8B969C';
const ROAD_COLOR = '#AD1D1A';

export default defineComponent({
  name: 'HomePage',
  created() {
    this.saveMapData(this.fastTravel);
  },
  mounted() {
    const { canvas } = this.$refs;

    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    canvas.addEventListener('mousedown', this.handleCanvasClick);

    this.drawBackgroundImage();
  },
  beforeUnmount() {
    this.$refs.canvas.removeEventListener('mousedown', this.handleCanvasClick);
  },
  data() {
    return {
      roads: [],
      edges: [],
      graph: null,
      destNode: null,
      startNode: null,
      hasDrawing: false,
      canvasWidth: 1280,
      canvasHeight: 1024,
      nodeCorrection: 5,
    };
  },
  watch: {
    showAllEdges(newValue) {
      this.clearCanvas();
      this.clearDrawnPath();

      if (newValue) {
        this.drawBackgroundImage(this.drawAllEdges);
      } else {
        this.drawBackgroundImage();
      }
    },
    fastTravel(newValue) {
      this.saveMapData(newValue);

      this.redrawPath(this.search());
    },
    isBfs(newValue) {
      this.redrawPath(newValue);
    },
  },
  computed: mapGetters({
    isBfs: 'isBfs',
    fastTravel: 'fastTravel',
    showAllEdges: 'showAllEdges',
  }),
  methods: {
    search(isBfs = this.isBfs) {
      if (isBfs) return this.graph.bfsFromStartToDest(this.startNode, this.destNode);

      return this.graph.dijkstra(this.startNode, this.destNode);
    },
    redrawPath(isBfs = this.isBfs) {
      if (this.hasDrawing) {
        this.clearCanvas();
        this.drawBackgroundImage(() => {
          this.drawPath(this.search(isBfs));
        });
      }
    },
    saveMapData(fastTravel) {
      const {
        graph, roads, pois, edges,
      } = loadMapData(fastTravel);

      this.graph = graph;
      this.roads = roads;
      this.edges = edges;
      this.points_of_interested = pois;
    },
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
      const bothSignposts = src.getProperties().signpost && dest.getProperties().signpost;

      this.drawLine(
        src.coordinates.x,
        src.coordinates.y,
        dest.coordinates.x,
        dest.coordinates.y,
        bothSignposts ? 'rgba(0, 255, 106, 0.8)' : '#000000',
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
    nodeCss(node) {
      const left = node.coordinates.x - this.nodeCorrection;
      const right = node.coordinates.y - this.nodeCorrection;
      const selected = node.id === this.startNode || node.id === this.destNode;
      const color = selected ? '#027be3' : node.getProperties().road ? ROAD_COLOR : POI_COLOR;

      return `left: ${left}px; top: ${right}px; background-color: ${color}`;
    },
    clearDrawnPath() {
      this.destNode = null;
      this.startNode = null;
      this.hasDrawing = false;

      this.clearCanvas();
      this.drawBackgroundImage();
    },
    handleNodeClick(node) {
      if (this.startNode && this.destNode) {
        this.clearDrawnPath();
      } else if (!this.startNode) {
        this.startNode = node.id;
      } else if (this.startNode && !this.destNode) {
        this.destNode = node.id;

        this.hasDrawing = true;

        // console.log(
        //   `Distance(${this.startNode}, ${this.destNode}): `,
        //   calculateDistance(
        //     this.graph.getNode(this.startNode).node.coordinates,
        //     this.graph.getNode(this.destNode).node.coordinates,
        //   ),
        // );

        this.drawPath(this.search());
      }
    },
    handleCanvasClick() {
      if (this.startNode || this.destNode) {
        this.clearDrawnPath();
      }
    },
    getCanvasAndContext() {
      const { canvas } = this.$refs;
      const context = canvas.getContext('2d');

      return { canvas, context };
    },
    getNodeTooltipMsg(nodeId) {
      if (!this.startNode && !this.destNode) return 'Clique para selecionar este nó como início';

      if (this.startNode && !this.destNode && this.startNode !== nodeId) {
        return 'Clique para selecionar este nó como destino';
      }

      return '';
    },
  },
});
</script>
