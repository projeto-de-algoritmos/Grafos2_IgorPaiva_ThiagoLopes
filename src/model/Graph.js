export default class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(node) {
    this.nodes[node.id] = node;
  }

  getNode(id) {
    return this.nodes[id];
  }

  getAllNodes() {
    return this.nodes;
  }

  addEdge(srcId, destId) {
    this.nodes[srcId].addEdge(destId);

    this.nodes[destId].addEdge(srcId);
  }
}
