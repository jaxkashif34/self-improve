// Graph
// A graph is a non-linear data structure that consists of a finite number of vertices
// (also called nodes) connected by edges
// Trees are a specific type of graph data structure
// There is no hierarchy in graphs unlink in trees
// Based on the characteristics of there Edges graphs can be be categorized in to two types

// 1) Directed : A graphs in which edges have direction
// Edges are usually represented by arrows pointing in the direction the graph can be traversed
//       A
//      / \
//     B - C
// 2) UnDirected : A graphs in which edges have no direction
// A graph in which the edges are bidirectional
// The graph can be traversed in either direction
// The absence of an arrow tells us that the graph is undirected

// More Types of graphs
// 1) A graph can only have node with no edges (lines)
// 2) multiple lines from one node
// 3) Cycles in Graphs
// 4) Self Loop on node
// 5) One or more node can be disconnected
// 4) A graph may contain weights on edges (lines) representing the coast of traversing on that edge

// Graph Usage
// 1) Google Maps -> Cities are vertices (nodes) and roads are edges
// 1) Social media sites -> Users are vertices and links are edges between connections (users)
// facebook, whatsapp, linkedin

// Graphs Representation
// represented in two ways
// 1) Adjacency matrix
// An adjacency matrix is a 2D array of size V x V where V is the number of vertices (nodes) in the graph
// Each row and column represent a vertex
// if the value of any element say, matrix[i][j] is 1, it represents that there is an edge connecting vertex i and vertex j
// (dealing with undirected graph)
//      A    B   C
//     -----------
// A  | 0    1   0  (A is connected to B)
// B  | 1    0   1  (B is connected to A and C)
// C  | 0    1   0  (C is connected to B)

const matrix = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
];

// 2) Adjacency List

// Vertices are stored in a map like data structure, and every vertex stores a list of its
// adjacent vertices

// A --→ B
// B --→ A, C
// C --→ B

const adjacencyList = {
  A: ['B'],
  B: ['A', 'C'],
  C: ['B'],
};

/* Adjacency Matrix vs Adjacency List
1) With an adjacency list, we only need to store the values for the edges that exist. With adjacency matrix,
you store values irrespective of whether an edge exists or not. Storage wise, an adjacency list is way 
more efficient
2) With adjacency list, inserting and finding adjacent nodes is constant time complexity whereas with 
adjacency matrix, it is linear time complexity.
3) An adjacency list allows you to store additional values with an edge such as weight of the edge. 
With adjacency matrix, such information would have to be stored externally
*/

class Graph<T extends PropertyKey> {
  // adjacencyList: { [key: string]: Set<T> };
  adjacencyList: Record<PropertyKey, Set<T>>;
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: T) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set<T>();
    }
  }

  addEdge(vertex1: T, vertex2: T) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }

  display() {
    for (let key in this.adjacencyList) {
      console.log(`${key} --> ${[...this.adjacencyList[key]]}`);
    }
  }

  hasEdge(vrt1: T, vrt2: T) {
    return (
      this.adjacencyList[vrt1].has(vrt2) && this.adjacencyList[vrt2].has(vrt1)
    );
  }

  removeEdge(vrt1: T, vrt2: T) {
    this.adjacencyList[vrt1].delete(vrt2);
    this.adjacencyList[vrt2].delete(vrt1);
  }

  removeVertex(vertex: T) {
    if (!this.adjacencyList[vertex]) return;

    for (let adjacentVertex of this.adjacencyList[vertex]) {
      // we are getting first vertex as a parameter and then we are looping through all the adjacent vertices and removing the edges
      this.removeEdge(vertex, adjacentVertex);
    }

    delete this.adjacencyList[vertex];
  }
}

const graph = new Graph<string>();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');

graph.addEdge('A', 'B');
graph.addEdge('B', 'C');

graph.display();
