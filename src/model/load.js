import Node from './Node';
import Graph from './Graph';
import mapData from '../assets/mapData';

export const loadMapData = (fastTravel = true) => {
  const graph = new Graph();

  mapData.nodes.forEach((node) => {
    graph.addNode(new Node(node.id, node.coordinates, node.properties));
  });

  mapData.edges.forEach((edge) => {
    graph.addEdge(edge[0], edge[1]);
  });

  if (fastTravel) {
    const combinations = mapData.signposts.flatMap(
      (v, i) => mapData.signposts.slice(i + 1).map((w) => [v, w]),
    );

    combinations.forEach((edge) => {
      graph.addEdge(edge[0], edge[1]);
    });
  }

  return graph;
};
