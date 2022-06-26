export default class Node {
  constructor(id, coordinates = { x: 0, y: 0 }, properties = {}) {
    this.id = id;
    this.coordinates = coordinates;
    this.properties = properties;
    this.edges = [];
  }

  getId() {
    return this.id;
  }

  getCoordinates() {
    return this.coordinates;
  }

  getProperties() {
    return this.properties;
  }

  getEdges() {
    return this.edges;
  }

  addEdge(destId) {
    this.edges.push(destId);
  }
}
