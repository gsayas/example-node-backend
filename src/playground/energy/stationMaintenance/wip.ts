import { Edge, Station, edges, stations, FCC } from "./problemDefinition";

// Let's define a function to calculate the cost of an Edge
function edgeCost(edge: Edge): number {
  return edge.distance * edge.factorOfConservation;
}

// let's define an heuristic function to estimate the remaining distance to the target
// h(n)
function heuristic(current: Station, target: string): number {
  const targetStation = stations.find((station) => station.id === target);
  if (!targetStation) {
    throw new Error(`Target station ${target} not found`);
  }
  // we will use the Euclidean distance between the current station and the target station
  return Math.sqrt(
    Math.pow(current.x - targetStation.x, 2) +
      Math.pow(current.y - targetStation.y, 2)
  );
}

// let's define a function to calculate the total acumulated cost of a path from the start station to the current station
// g(n)
function acumulatedCost(path: Edge[]): number {
  return path.reduce((acc, edge) => acc + edgeCost(edge), 0);
}

// Now let's define an evaluation function for the current node
// f(n) = g(n) + h(n)
function estimatedCost(path: Edge[], target: string): number {
  const currentStation = stations.find(
    (station) => station.id === path[path.length - 1].to
  )!;
  return acumulatedCost(path) + heuristic(currentStation, target);
}

/**
 *
 */
