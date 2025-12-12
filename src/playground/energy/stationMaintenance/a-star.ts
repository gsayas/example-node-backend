import { stations, edges } from "./problemDefinition";
import { NodeId, GraphNode, HeuristicFn } from "./types";
import { euclideanHeuristic, manhattanHeuristic } from "./heuristics";

/**
 * A* Search
 */
export function aStar(
  graph: Record<NodeId, GraphNode>,
  start: NodeId,
  goal: NodeId,
  heuristic: HeuristicFn
): NodeId[] | null {
  // Cost from start to each node
  const gScore: Record<NodeId, number> = {};
  // Estimated total cost (g + h)
  const fScore: Record<NodeId, number> = {};

  const openSet = new Set<NodeId>([start]);
  const cameFrom: Record<NodeId, NodeId | undefined> = {};

  Object.keys(graph).forEach((id) => {
    gScore[id] = Infinity;
    fScore[id] = Infinity;
  });

  gScore[start] = 0;
  fScore[start] = heuristic(start, goal);

  while (openSet.size > 0) {
    // Node in openSet with lowest fScore
    let current = Array.from(openSet).reduce((a, b) =>
      fScore[a] < fScore[b] ? a : b
    );

    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);

    for (const { id: neighbor, cost } of graph[current].neighbors) {
      const tentative = gScore[current] + cost;

      if (tentative < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentative;
        fScore[neighbor] = tentative + heuristic(neighbor, goal);
        openSet.add(neighbor);
      }
    }
  }

  return null; // No path
}

function reconstructPath(
  cameFrom: Record<NodeId, NodeId | undefined>,
  current: NodeId
): NodeId[] {
  const path = [current];
  while (cameFrom[current]) {
    current = cameFrom[current]!;
    path.push(current);
  }
  return path.reverse();
}

/**
 * Build graph from edges
 * Cost = distance * factorOfConservation
 */
function buildGraph(): Record<NodeId, GraphNode> {
  const graph: Record<NodeId, GraphNode> = {};

  // Initialize all stations as nodes
  stations.forEach((station) => {
    graph[station.id] = {
      id: station.id,
      neighbors: [],
    };
    // console.log(`Station: ${station.id} - x:${station.x},y:${station.y}`);
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    const cost = edge.distance * edge.factorOfConservation;
    graph[edge.from].neighbors.push({
      id: edge.to,
      cost,
    });
  });

  return graph;
}

// Build the graph from definitions
const graph = buildGraph();

// const eucledianSolution = aStar(graph, "A", "H", euclideanHeuristic);
// console.log("Path from A to H, using Eucledian Heuristic:", eucledianSolution);

console.log(
  "Path from A to H, using Manhattan Heuristic",
  aStar(graph, "A", "H", manhattanHeuristic)
);
console.log(
  "Path from D to A, using Manhattan Heuristic",
  aStar(graph, "D", "A", manhattanHeuristic)
);
console.log(
  "Path from C to G, using Manhattan Heuristic",
  aStar(graph, "C", "G", manhattanHeuristic)
);
console.log(
  "Path from E to A, using Manhattan Heuristic",
  aStar(graph, "E", "A", manhattanHeuristic)
);
