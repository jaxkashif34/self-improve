// Tree
// A tree is a hierarchical data structure that consists of nodes connected by edges
// A tree is a non-linear data structure, compared to arrays, linked lists, stacks and
// queues which are linear data structures.
// In linear data structures, the time required to search is proportional to the size of
// the data set
// Trees however, owing to the nonlinear nature allow quicker and easier access to
// the data
// A tree will not contain any loops or cycles.

//       A ------> nodes
//      /  \------> edges
//     B    C

// Tree Usages
// File System for directory structure
// A Family Tree
// An Organization Tree
// DOM
// Chat Bots
// Abstract syntax tree

// Nodes with no child are leaf nodes
// Node with no parent node are called root node
// Degree of a Node = Total number of a child nodes it have
// Depth of a Node = number of edges from root node to that node (depth of a root node is always zero)
// Height of a Tree = number of edges from the deepest leaf to that node
// Height of a root node is considered as height of a tree

// Binary Tree
// A binary tree is a tree data structure in which each node has at most two children
// They are referred to as left child and right child

//       A
//      / \
//     B   C
//    /
//   A
//  / \
// B   C

// The value of each left node must be smaller than the parent node
// The value of each right node must be greater than the parent node
// Each node having at most two children

//       20
//      / \
//    19   22
//    /
//   15
//  / \
// 12  17

// export {};
export class Node<T> {
  left: null | Node<T>;
  right: null | Node<T>;
  value: T;
  constructor(value: T) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

export class BinarySearchTree<T> {
  private root: Node<T> | null;
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  insert(value: T) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root!, newNode);
    }
  }

  private insertNode(root: Node<T>, newNode: Node<T>) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (newNode.value > root.value) {
        if (root.right === null) {
          root.right = newNode;
        } else {
          this.insertNode(root.right, newNode);
        }
      }
    }
  }
  // root parameter is optional and default value is this.root
  search(value: T, root = this.root): boolean {
    if (!root) return false; // at last this will handle if value isn't found
    else {
      if (value === root.value) return true;
      else {
        if (value < root.value) return this.search(value, root.left);
        else return this.search(value, root.right);
      }
    }
  }

  preOrder(root = this.root) {
    // way to traverse a tree (root, left, right)
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  inOrder(root = this.root) {
    // way to traverse a tree (left, root, right)
    if (root) {
      this.inOrder(root.left);
      console.log(root.value);
      this.inOrder(root.right);
    }
  }

  postOrder(root = this.root) {
    // way to traverse a tree (left, right, root)
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }

  // bfs Traverse without using array
  // Steps to follow for bfs traverse
  // 1. Create a queue (this can be an array) and a variable to store the values of nodes visited
  // 2. Place the root node in the queue
  // 3. Loop as long as there is anything in the queue
  // 4. Dequeue a node from the queue and push the value of the node into the variable that stores the nodes
  // 5. If there is a left property on the node dequeued - add it to the queue
  // 6. If there is a right property on the node dequeued - add it to the queue
  // 7. Return the variable that stores the values
  levelOrder() {
    // (bfs traverse)
    if (!this.root) return null;
    const queue: Node<T>[] = [];
    const result: T[] = [];
    queue.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      result.push(node!.value);
      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }
    return result;
  }
  min(root = this.root): T | null {
    // as we know that in binary tree the left leaf node hold the smallest value so we only need to lookup the left node
    if (!root) return null;
    let min = root.value;
    if (root.left) {
      return this.min(root.left);
    }
    return min;
  }

  max(root = this.root): T | null {
    // as we know that in binary tree the right leaf node hold the smallest value so we only need to lookup the right node
    if (!root) return null;
    let max = root.value;
    if (root.right) {
      return this.max(root.right);
    }
    return max;
  }

  // delete method
  delete(value: T) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root: Node<T> | null, value: T) {
    if (!root) return null;
    // first we need to find the same node with the passed value
    if (value < root.value) {
      // if value is less then the root value it's mean node should be on left side of BT (binary tree)
      root.left = this.deleteNode(root.left, value);
      /* we are assigning deleNode method to root.left or root.right because when value is not less 
      then root.value or neither greater then it will go in else block there we have three cases 
      when return null or some other nodes it will assign to them either root.left of root.right 
      (according to the value and recursion) making parent's child null if no child is present 
      or connecting below nodes to the parent according to the tree
      */
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // when it is a leaf node
      if (!root.left && !root.right) {
        return null;
      }
      // when there is one node on either left or right side
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      // when the node has both left and right nodes
      root.value = this.min(root.right)!; // find the min value from right side of node and assign it to the root.value
      /* we are assigning the min value to root.value cuz we want to take the min value from the 
      right sub-tree to that current node so by assigning it we are making the same node's value 
      equal the current one and the min value node from the right sub-tree after that we just 
      need to delete the min value node from the right sub-tree cuz we already move it to it's 
      parent position after passing it to deleNode method again it will again check for either 
      it has no child or have one or have to and repeat the process
      */
      /* note that we are passing the min value along with the root.right to avoid infinite 
      recursion if we pass only root this will cause infinite recursion cycle*/
      root.right = this.deleteNode(root.right, root.value); // after finding min value then delete that min value from the right side of tree
      /* we are assigning what ever comes by calling deleteNode to the root.right because we 
      are dealing with right sub-tree (means that now we have to move the right sub-tree at the current node position)
      */
    }
    return root;
  }

  maxDepth(root = this.root): number {
    /* basically we are traversing the tree and in each recursion termination we return 0
     but when both left and right node is evaluated then we add return 1 because see we 
     only return 1 when we reached at the leaf node this how we are count the nodes of 
     a tree and then at the end we get the max value by Math.max function (built-in)
    */
    if (!root) return 0;
    const left = this.maxDepth(root.left);
    const right = this.maxDepth(root.right);
    return Math.max(left, right) + 1;
  }
}

const bst = new BinarySearchTree();

bst.insert(30);
bst.insert(12);
bst.insert(23);
bst.insert(22);
bst.insert(24);
bst.insert(9);
bst.maxDepth();
// Tree Traversal
// Visiting every node in the tree
// A hierarchical data structure like a tree can be traversed in different ways
// 1. Depth First Search (DFS)
// 2. Breadth First Search (BFS)

// Depth First Search (DFS)
// The DFS algorithm starts at the root node and explores as far as possible along
// each branch before backtracking
// Visit the root node, visit all the nodes in the left subtree and visit all the nodes in
// the right subtree
// Depending on the order in which we do this, there can be three types of DFS
// traversals
// 1. PreOrder
// 2. InOrder
// 3. PostOrder

// PreOrder Traversal : first read the left subtree to all the way leaf node then backtrack to the upper parent node and traverse the right subtree of latest parent at the end and then go upward and read the remaining subtrees

// BFS Traversal
