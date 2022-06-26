export default class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(node) {
    this.nodes[node.id] = { node, adjList: [] };
  }

  getNode(id) {
    return this.nodes[id];
  }

  getAllNodes() {
    return this.nodes;
  }

  addEdge(srcId, destId) {
    this.nodes[srcId].adjList.push(destId);

    this.nodes[destId].adjList.push(srcId);
  }
}
