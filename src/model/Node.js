export default class Node {
  constructor(id, coordinates = { x: 0, y: 0 }, properties = {}) {
    this.id = id;
    this.coordinates = coordinates;
    this.properties = properties;
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

  getProperty(prop) {
    return this.properties[prop];
  }
}
