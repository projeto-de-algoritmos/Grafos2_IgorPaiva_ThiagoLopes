import Node from './Node';
import Graph from './Graph';
import mapData from '../assets/mapData';

export const loadMapData = (fastTravel = true) => {
  const graph = new Graph();
  const roads = [];
  const pois = [];

  mapData.points_of_interest.forEach((poi) => {
    const node = new Node(poi.id, poi.coordinates, poi.properties);

    graph.addNode(node);

    pois.push(node);
  });

  mapData.roads.forEach((road) => {
    const node = new Node(road.id, road.coordinates, road.properties);

    graph.addNode(node);

    roads.push(node);
  });

  mapData.edges.forEach((edge) => {
    graph.addEdge(edge[0], edge[1]);
  });

  if (fastTravel) {
    const signpostsCombinations = mapData.signposts.flatMap(
      (v, i) => mapData.signposts.slice(i + 1).map((w) => [v, w]),
    );

    signpostsCombinations.forEach((edge) => {
      graph.addEdge(edge[0], edge[1]);
    });
  }

  return {
    graph, roads, pois, edges: mapData.edges,
  };
};
