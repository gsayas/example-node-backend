export type NodeId = string;

export interface GraphNode {
  id: NodeId;
  neighbors: { id: NodeId; cost: number }[];
}

export type HeuristicFn = (a: NodeId, b: NodeId) => number;
