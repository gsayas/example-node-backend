/**
    We need to find the best route between two points in a electrical grid.
    We will use the A* algorithm to find the best path between these two points.
*/

// let's define a data structure to hold the paths and the distances between the nodes
interface Edge {
  from: string;
  to: string;
  distance: number;
  factorOfConservation: FCC;
}

// let's define a data structure to hold the stations and their coordinates
interface Station {
  id: string;
  x: number;
  y: number;
}

/* There's also a Factor of Conservation of the Edge, which is a factor that is used to determine the cost of the edge.
To obtain the cost of the edge, we need to multiply the distance by the factor of conservation of the edge.
There are three types of factors of conservation of the edge: GOOD: 2, REGULAR: 5, BAD: 8 */

enum FCC {
  GOOD = 2,
  REGULAR = 5,
  BAD = 8,
}

const stations: Station[] = [
  { id: "A", x: 2, y: 7 },
  { id: "B", x: 4, y: 8 },
  { id: "C", x: 7, y: 8 },
  { id: "D", x: 8, y: 5 },
  { id: "E", x: 6, y: 3 },
  { id: "F", x: 3, y: 4 },
  { id: "G", x: 2, y: 1 },
  { id: "H", x: 8, y: 1 },
];

// Now based on the Table above, let's create the data structure to hold the edges, including the factor of conservation of the edge.
const edges: Edge[] = [
  { from: "A", to: "B", distance: 280, factorOfConservation: FCC.GOOD },
  { from: "A", to: "C", distance: 563, factorOfConservation: FCC.REGULAR },
  { from: "B", to: "A", distance: 272, factorOfConservation: FCC.BAD },
  { from: "B", to: "D", distance: 649, factorOfConservation: FCC.GOOD },
  { from: "C", to: "F", distance: 718, factorOfConservation: FCC.GOOD },
  { from: "D", to: "C", distance: 361, factorOfConservation: FCC.GOOD },
  { from: "D", to: "E", distance: 323, factorOfConservation: FCC.REGULAR },
  { from: "E", to: "D", distance: 343, factorOfConservation: FCC.BAD },
  { from: "E", to: "F", distance: 411, factorOfConservation: FCC.GOOD },
  { from: "E", to: "H", distance: 340, factorOfConservation: FCC.GOOD },
  { from: "F", to: "A", distance: 371, factorOfConservation: FCC.REGULAR },
  { from: "F", to: "E", distance: 356, factorOfConservation: FCC.BAD },
  { from: "G", to: "E", distance: 532, factorOfConservation: FCC.GOOD },
  { from: "G", to: "F", distance: 372, factorOfConservation: FCC.REGULAR },
  { from: "H", to: "D", distance: 466, factorOfConservation: FCC.BAD },
  { from: "H", to: "G", distance: 727, factorOfConservation: FCC.BAD },
];

// export definitions as a module
export type { Edge, Station, FCC };
export { edges, stations };

//TODO: at this point we could start displaying the resulting graph in a visualization tool like Graphviz or Sigma.js
