export {};
// ******************* From FireShip *******************
// https://www.youtube.com/watch?v=cWNEl4HE2OE&list=WL&index=185
// Think of something like instagram, where you have a network of users and connections between them
// A user is a node (vertex) and the connection between them is an edge
// Graphs are used to represent networks
// every time when we follow someone on Instagram, we are creating a new edge (this is know as a directed graph)
// Graphs can be directed or undirected
// Directed Graphs: Edges have a direction
// Undirected Graphs: Edges have no direction
// Graphs can also be weighted or unweighted
// Weighted Graphs: Edges have a value
// Unweighted Graphs: Edges have no value
// Graphs can also be cyclic or acyclic
// Cyclic Graphs: Graphs that have cycles
// Acyclic Graphs: Graphs that have no cycles
// Graphs can also be connected or disconnected
// Connected Graphs: Graphs that have a path between every pair of vertices
// Disconnected Graphs: Graphs that have no path between every pair of vertices

const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');

const buildGraph = {
  i: ['j', 'k'],
  j: ['i'],
  k: ['i', 'm', 'l'],
  l: ['k'],
  m: ['k'],
  n: ['o'],
  o: ['n'],
};

const edges = [
  ['w', 'x'],
  ['x', 'y'],
  ['z', 'y'],
  ['z', 'v'],
  ['w', 'v'],
];

// Graph implementation

const routes = [
  ['PHX', 'LAX'],
  ['PHX', 'JFK'],
  ['JFK', 'OKC'],
  ['JFK', 'HEL'],
  ['JFK', 'LOS'],
  ['MEX', 'LAX'],
  ['MEX', 'BKK'],
  ['MEX', 'LIM'],
  ['MEX', 'EZE'],
  ['LIM', 'BKK'],
];
// Explanation : https://www.youtube.com/watch?v=cWNEl4HE2OE
class Graph<T> {
  adjacencyList: Map<T, T[]>;
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(airport: T) {
    this.adjacencyList.set(airport, []);
  }

  addEdge(origin: T, destination: T) {
    if (!this.adjacencyList.has(origin)) {
      this.addNode(origin);
    }
    if (!this.adjacencyList.has(destination)) {
      this.addNode(destination);
    }
    this.adjacencyList.get(origin)!.push(destination);
    this.adjacencyList.get(destination)!.push(origin);
  }

  /* airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ')
    routes = [
      ['PHX', 'LAX'],
      ['PHX', 'JFK'],
      ['JFK', 'OKC'],
      ['JFK', 'HEL'],
      ['JFK', 'LOS'],
      ['MEX', 'LAX'],
      ['MEX', 'BKK'],
      ['MEX', 'LIM'],
      ['MEX', 'EZE'],
      ['LIM', 'BKK'],
    ]
*/

  createGraph(airports: T[], routes: T[][]) {
    // add edges
    routes.forEach((route) => this.addEdge(route[0], route[1]));
  }

  display() {
    console.log(this.adjacencyList);
  }

  bfs(start: T) {
    // traversing the graph in a breadth first manner
    const queue = [start];
    const visited = new Set<T>();

    while (queue.length > 0) {
      const airport = queue.shift();
      if (!airport) return console.log('No airport found');
      const destinations = this.adjacencyList.get(airport); // get all the connected edges of that airport
      if (!destinations) return console.log('No destinations found');

      for (const destination of destinations) {
        if (!visited.has(destination)) {
          queue.push(destination);
          visited.add(destination);
        }
      }
    }
  }

  // create a showPath method to show the path from start to destination
  showPath(start: T, destination: T) {
    const queue: T[][] = [[start]];
    const visited = new Set<T>();

    while (queue.length > 0) {
      const path = queue.shift() as T[];
      const airport = path[path.length - 1];
      if (airport === destination) {
        console.log(path);
        return;
      }

      const destinations = this.adjacencyList.get(airport);
      if (!destinations) return console.log('No destinations found');

      for (const destination of destinations) {
        if (!visited.has(destination)) {
          queue.push([...path, destination]);
        }
      }
      visited.add(airport);
    }
  }

  dfs(start: T, visited = new Set()) {
    // can be used for finding a path b/w start and destination (BKK)
    // minimum sets required to found the destination (Bangkok) in this case is 3
    console.log(start);

    visited.add(start);

    const destinations = this.adjacencyList.get(start);
    if (!destinations) return console.log('No destinations found');

    for (const destination of destinations) {
      if (destination === 'BKK') {
        console.log(`DFS found Bangkok in ${visited.size} steps`);
        return;
      }

      if (!visited.has(destination)) {
        this.dfs(destination, visited);
      }
    }
  }
}

const graph = new Graph<string>();

// graph.createGraph(airports, routes);
// graph.display();
// graph.showPath('PHX', 'EZE');

// ******************* From freeCodeCamp *******************

// https://www.youtube.com/watch?v=tWVWeAqZ0WU&list=WL&index=185

(() => {
  const graphItem = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: [],
  };

  const gridILandCount = [
    ['W', 'L', 'W', 'W', 'L'],
    ['W', 'L', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'L', 'W'],
    ['W', 'W', 'L', 'L', 'W'],
    ['L', 'W', 'W', 'L', 'L'],
    ['L', 'L', 'W', 'W', 'W'],
  ];

  type GraphItemKeys = keyof typeof graphItem;
  class Graph<T> {
    constructor() {}
    dfs(start: T) {
      // this method might be wrong
      console.log(start);
      const stack = [start];
      while (stack.length !== 0) {
        const firstItem = stack.pop() as GraphItemKeys;
        const edges = graphItem[firstItem];
        for (const edge of edges) {
          this.dfs(edge as T);
        }
      }
    }

    dfsRecursive(start: GraphItemKeys) {
      console.log(start);
      for (const edge of graphItem[start]) {
        this.dfsRecursive(edge as GraphItemKeys);
      }
    }

    bfs(start: T) {
      const queue = [start];

      while (queue.length !== 0) {
        const firstItem = queue.shift() as GraphItemKeys;
        console.log(firstItem);
        const edges = graphItem[firstItem];
        for (const edge of edges) {
          queue.push(edge as T);
        }
      }
    }

    // hasPathDfs is implemented in above graph

    hasPathBfs(start: T, destination: T): boolean {
      const queue = [start];

      while (queue.length !== 0) {
        const firstItem = queue.shift() as GraphItemKeys;

        if (firstItem === destination) return true;

        for (const edge of graphItem[firstItem]) {
          queue.push(edge as T);
        }
      }
      return false;
    }

    // ************************ undirected graphs ************************
    /*
     edges into adjacencyList
     edges = [                      graph: {
       ['i', 'j'],                    i: ['j', 'k'];
       ['k', 'i'],                    j: ['i'];
       ['m', 'k'],   ---------->      k: ['i', 'm', 'l'];
       ['k', 'l'],                    l: ['k'];
       ['o', 'n'],                    m: ['k'];
     ];                               n: ['o'];
                                      o: ['n'];
                                     } */

    edgesIntoAdjacencyList(edges: string[][]) {
      const graph: { [key: string]: string[] } = {};

      for (const edge of edges) {
        const [firstItem, secondItem] = edge;
        if (!(firstItem in graph)) graph[firstItem] = [];
        if (!(secondItem in graph)) graph[secondItem] = [];

        graph[firstItem].push(secondItem);
        graph[secondItem].push(firstItem);
      }
      return graph;
    }

    undirectedPath(edges: string[][], nodeA: T, nodeB: T) {
      const graph = this.edgesIntoAdjacencyList(edges);
      return this.hasPathDfs(graph, nodeA, nodeB, new Set());
    }

    //   buildGraph = {
    //   i: ['j', 'k'],
    //   j: ['i'],
    //   k: ['i', 'm', 'l'],
    //   l: ['k'],
    //   m: ['k'],
    //   n: ['o'],
    //   o: ['n'],
    // };

    hasPathDfs(
      graph: Record<string, string[]>,
      src: any,
      dst: T,
      visited = new Set()
    ): boolean {
      if (src === dst) return true;
      /* we are returning false on visited node because we don't want to go 
      back to the node we have already visited so by returning true we are 
      exiting th function and continuing the loop or continuing the 
      recursion (second function in the call stack)*/
      if (visited.has(String(src))) return false;

      visited.add(String(src));

      for (const neighbor of graph[src]) {
        if (this.hasPathDfs(graph, neighbor as T, dst, visited)) return true;
      }
      return false;
    }

    connectedComponent(graph: Record<string, string[]>) {
      let count = 0;
      const visited = new Set<string>();
      for (const node in graph) {
        if (this.explore(graph, node, visited)) count++;
      }
      return count;
    }

    /*

    graph = {
    a: ['b', 'c'],
    b: ['a', 'd'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: [],
  };

    */

    private explore(
      graph: Record<string, string[]>,
      current: any,
      visited: Set<string>
    ): boolean {
      /* we are returning false here because we don't want to increment the 
      count means we don't want to indicate that we have visit all the 
      nodes of a component*/
      if (visited.has(current)) return false;
      /* we only want to increment the count once we visit all the nodes 
      of a component that's why we are returning true once loop ends*/

      visited.add(current);

      for (const neighbor of graph[current]) {
        this.explore(graph, neighbor, visited);
      }
      return true;
    }

    // largest component
    largestComponentSize(graph: Record<string, string[]>) {
      const visited = new Set<string>();
      let largest = 0;

      for (const node in graph) {
        const size = this.exploreSize(graph, node, visited);
        if (size > largest) largest = size;
      }
      return largest;
    }

    private exploreSize(
      graph: Record<string, string[]>,
      current: string,
      visited = new Set()
    ): number {
      if (visited.has(current)) return 0;
      visited.add(current);
      let size = 1;

      for (const next of graph[current]) {
        size += this.exploreSize(graph, next, visited);
      }

      return size;
    }

    // shortest path with distance (edges) (BFS)
    shortestPath(graph: Record<string, string[]>, src: string, dst: T): number {
      // we can find the shortest path using BFS otherwise if go with DFS it's time complexity is much more higher then BFS
      const queue: [string, number][] = [[src, 0]];
      const visited = new Set(src);

      while (queue.length !== 0) {
        const [current, distance] = queue.shift()!;
        if (current === dst) return distance;

        for (const neighbor of graph[current]) {
          if (!visited.has(neighbor)) {
            queue.push([neighbor, distance + 1]);
            visited.add(neighbor);
          }
        }
      }
      return -1;
    }

    /*

    [
      ['W', 'L', 'W', 'W', 'L'],
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'L', 'W'],
      ['W', 'W', 'L', 'L', 'W'],
      ['L', 'W', 'W', 'L', 'L'],
      ['L', 'L', 'W', 'W', 'W'],
    ]

    */

    isLandCount(grid: string[][]) {
      const visited = new Set<string>();
      let count = 0;

      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          if (grid[row][col] === 'L' && !visited.has(`${row}-${col}`)) {
            // using row-col because imagine we first have row 12 and col 4 and then we have row 1 and col 24, so if we use row and col together (124 and 124) then it will be same for both but if we use row-col then it will be different
            this.exploreIsland(grid, row, col, visited);
            count++;
          }
        }
      }
      return count;
    }

    private exploreIsland(
      grid: string[][],
      row: number,
      col: number,
      visited: Set<string>
    ) {
      const rowInBounds = 0 <= row && row < grid.length; // over all array length
      const colInBounds = 0 <= col && col < grid[0].length; // first row length others are same

      if (!rowInBounds || !colInBounds) return;
      if (grid[row][col] === 'W') return;
      if (visited.has(`${row}-${col}`)) return;

      visited.add(`${row}-${col}`);

      this.exploreIsland(grid, row - 1, col, visited);
      this.exploreIsland(grid, row + 1, col, visited);
      this.exploreIsland(grid, row, col - 1, visited);
      this.exploreIsland(grid, row, col + 1, visited);
    }

    minimumIsland(grid: string[][]) {
      const visited = new Set<string>();
      let min = Infinity;

      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          if (grid[row][col] === 'L' && !visited.has(`${row}-${col}`)) {
            const size = this.exploreIslandSize(grid, row, col, visited);
            if (size < min) min = size;
          }
        }
      }
      return min;
    }

    private exploreIslandSize(
      grid: string[][],
      row: number,
      col: number,
      visited: Set<string>
    ) {
      const rowInBounds = 0 <= row && row < grid.length;
      const colInBounds = 0 <= col && col < grid[0].length;

      if (!rowInBounds || !colInBounds) return 0;
      if (grid[row][col] === 'W') return 0;
      if (visited.has(`${row}-${col}`)) return 0;

      visited.add(`${row}-${col}`);

      let size = 1;

      size += this.exploreIslandSize(grid, row - 1, col, visited);
      size += this.exploreIslandSize(grid, row + 1, col, visited);
      size += this.exploreIslandSize(grid, row, col - 1, visited);
      size += this.exploreIslandSize(grid, row, col + 1, visited);

      return size;
    }
  }

  const graph = new Graph();
  const adjacencyGraph = {
    '3': [],
    '4': ['6'],
    '6': ['4', '5', '7', '8'],
    '8': ['6'],
    '7': ['6'],
    '5': ['6'],
    '1': ['2'],
    '2': ['1'],
  };
  // console.log(graph.edgesIntoAdjacencyList(edges));

  // graph.shortestPath(graph.edgesIntoAdjacencyList(edges), 'w', 'z')
  console.log(graph.connectedComponent(adjacencyGraph));
  // console.log('count', graph.largestComponentSize(adjacencyGraph));
})();
