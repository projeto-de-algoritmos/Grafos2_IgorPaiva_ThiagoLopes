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

  numEdges() {
    let edges = 0;

    Object.values(this.nodes).forEach((item) => {
      edges += item.adjList.length;
    });

    return edges / 2;
  }

  bfs(callback) {
    const visited = {};

    Object.keys(this.nodes).forEach((s) => {
      if (!visited[s]) {
        this.bfsFromStart(s, visited, callback);
      }
    });

    return visited;
  }

  bfsFromStart(start, visited, callback) {
    const queue = [start];

    visited[start] = true;

    while (queue.length > 0) {
      const u = queue.shift();

      this.nodes[u].adjList.forEach((v) => {
        if (!visited[v]) {
          visited[v] = true;

          callback(this.nodes[u].node, this.nodes[v].node);

          queue.push(v);
        }
      });
    }
  }

  bfsFromStartToDest(start, dest) {
    const visited = {};
    const queue = [[start]];

    visited[start] = true;

    while (queue.length > 0) {
      const path = queue.shift();
      const node = path[path.length - 1];

      if (node === dest) {
        return path;
      }

      this.nodes[node].adjList.forEach((v) => {
        if (!visited[v]) {
          queue.push([...path, v]);

          visited[v] = true;
        }
      });
    }

    return [];
  }
}
