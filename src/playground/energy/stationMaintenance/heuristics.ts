import { stations } from "./problemDefinition";
import { HeuristicFn } from "./types";

/**
 * Manhattan distance heuristic using station coordinates
 */
export const manhattanHeuristic: HeuristicFn = (a, b) => {
  const stationA = stations.find((s) => s.id === a);
  const stationB = stations.find((s) => s.id === b);

  if (!stationA || !stationB) {
    return Infinity; // Invalid station IDs
  }

  const manhattanDistance =
    Math.abs(stationA.x - stationB.x) + Math.abs(stationA.y - stationB.y);
  // console.log("manhattanDistance:" + manhattanDistance);

  return manhattanDistance;
};

/**
 * Euclidean distance heuristic using station coordinates
 */
export const euclideanHeuristic: HeuristicFn = (a, b) => {
  const stationA = stations.find((s) => s.id === a);
  const stationB = stations.find((s) => s.id === b);

  if (!stationA || !stationB) {
    return Infinity;
  }

  const dx = stationA.x - stationB.x;
  const dy = stationA.y - stationB.y;
  const euclideanDistance = Math.sqrt(dx * dx + dy * dy);
  // console.log("euclideanDistance:" + euclideanDistance);

  return euclideanDistance;
};
