/* 
source: ChatGPT
            General Binary Tree:
A binary tree is a data structure where each node has at most two children (often referred to 
as the left child and the right child). It doesn't require any specific arrangement of nodes, 
and it can be very unbalanced or have gaps at various levels.

Example of a Valid Binary Tree That Isn't Complete or Almost Complete:
    1
     \
      2
       \
        3
This tree has nodes only on the right side. It doesn't follow the rules of a complete binary 
tree or an almost complete binary tree, but it is still a valid binary tree.

        Validity of a Binary Tree:
A binary tree is considered valid as long as:

Each node has at most two children: A left and a right child.
The tree is connected: There is a path from the root to all other nodes.

            Types of Binary Trees:
1) Full Binary Tree: Every node has 0 or 2 children.
2) Perfect Binary Tree: All internal nodes have 2 children, and all leaf nodes are at the same level.
3) Balanced Binary Tree: The height difference between the left and right subtrees of any node is at most 1.
4) Skewed Binary Tree: All nodes have only one child (either left or right).

A tree can be represented as an array 

for example (source:ChatGPT)

if Parent is at -> i (i starts from 0)
left-child -> 2 * i + 1
right-child -> 2 * i + 2

given child index want to find parent index
then -> floor((i - 1) / 2) i is the index

if we have an array then we can easily get all internal nodes and all leaf nodes
    internal nodes = 0 to (floor(n/2) - 1)
    leaf nodes = floor(n/2) to n - 1

const treeArray = [1, 2, 3, 4, 5, 6, 7];

        1
      /   \
     2     3
    / \   / \
   4   5 6   7


*/

/*

Input Array Tree of maxHeapify
        1
       / \
     14   8
    / \   / \
   10  7  9   3
  / \ / \
 2  4 6

//  neex to check if both child are greater
output Array Tree maxHeapify

        14
       /  \
     10    9
    / \   / \
   4   7 8   3
  / \ / \
 2  1 6

Detailed explanation is on pdf page 8 to onwards

*/

class Heap {
  private heap: number[];

  constructor(arr: number[]) {
    this.heap = arr;
    this.maxHeapify(); // Build the heap when initializing
  }

  /**
   * A function that ensures the max-heap property is maintained for a given node in the array.
   *
   * @param arr - The array representing the heap.
   * @param i - The index of the node to heapify.
   * @returns The modified array with the max-heap property enforced.
   */
  maxHeapifyArrange(arr: number[], i: number): number[] {
    let left = i * 2 + 1; // Index of the left child
    let right = i * 2 + 2; // Index of the right child
    let largest = i; // Assume the current node is the largest

    // Check if the left child exists and is greater than the current node
    if (left < arr.length && arr[largest] < arr[left]) {
      largest = left;
    }

    // Check if the right child exists and is greater than the largest node found so far
    if (right < arr.length && arr[largest] < arr[right]) {
      largest = right;
    }

    // If the largest node is not the current node, swap them and recursively heapify
    if (i !== largest) {
      [arr[largest], arr[i]] = [arr[i], arr[largest]]; // Swap the values
      this.maxHeapifyArrange(arr, largest); // Recursively heapify the affected subtree
    }

    return arr; // Return the array after ensuring the max-heap property
  }

  private maxHeapify(arr = this.heap): void {
    const length = this.heap.length;
    /* we can't heapify the current element if both left and right child don't follow the heap 
    property and leaf nodes are the nodes that follows the heap property so we will 
    start from (just aboove the leaf nodes) upper level to the leaf node and will 
    go all the way to the 0th index

    if we have an array then we can easily get all internal nodes and all leaf nodes
    internal nodes = 0 to (floor(n/2) - 1)
    leaf nodes = (floor(n/2)) to n - 1

    we are starting the loop from the last internal node to the root node becase 
    the last interanl node's child follow the heap property
    */
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
      this.maxHeapifyArrange(this.heap, i);
    }
  }

  public extractMax(): number | null {
    if (this.heap.length === 0) {
      return null; // Heap is empty
    }

    const max = this.heap[0]; // Root of the heap is the maximum element
    const lastElement = this.heap.pop(); // Remove the last element

    // we have to check if where we are overrinding the index 0 ITC and last element are valid or not
    if (this.heap.length > 0 && lastElement !== undefined) {
      this.heap[0] = lastElement; // Move the last element to the root
      this.maxHeapifyArrange(this.heap, 0); // Restore the max heap property
    }

    return max;
  }

  private percolateUp(index: number): void {
    let parent = Math.floor((index - 1) / 2);

    while (index > 0 && this.heap[parent] < this.heap[index]) {
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ]; // Swap
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  }

  public increaseValue(index: number, newValue: number): void {
    if (newValue <= this.heap[index]) {
      throw new Error("New value must be greater than the current value");
    }

    this.heap[index] = newValue; // Update the value at the index
    this.percolateUp(index); // Ensure the heap property is maintained
  }

  public decreaseValue(index: number, newValue: number): void {
    if (newValue >= this.heap[index]) {
      throw new Error("New value must be less than the current value");
    }

    this.heap[index] = newValue; // Update the value at the index
    this.maxHeapifyArrange(this.heap, index); // Restore the heap property using maxHeapify
  }

  public insertElement(value: number): void {
    this.heap.push(value); // Add the new element to the end of the heap
    this.percolateUp(this.heap.length - 1); // Restore the heap property by percolating up
  }

  public heapSort(): number[] {
    const sortedArray: number[] = [];

    while (this.heap.length > 0) {
      sortedArray.push(this.extractMax()!);
    }

    return sortedArray.reverse(); // Reverse the array to get sorted order
  }

  findKthLargest(arr: number[], k: number): number {
    this.maxHeapify(arr);
    let kthLargest = Infinity;

    for (let i = 0; i < k; i++) {
      kthLargest = this.extractMax()!;
    }

    return kthLargest;
  }

  /**
   * A function to simulate the last stone weight problem using a max-heap.
   *
   * @param arr - The array representing the stones.
   * @returns The weight of the last remaining stone or 0 if no stones are left.
   * @example : [24, 56, 26, 58, 62, 72, 67, 82, 72]
   */
  getLastStoneWeight(arr: number[]): number {
    // Convert the array to a max-heap
    this.maxHeapify(arr);

    /**
     * A recursive function to process the stones until only one or no stones remain.
     *
     * @param arr - The heapified array representing the stones.
     * @returns The weight of the last remaining stone or 0 if no stones are left.
     */
    const func = (arr: number[]): number => {
      let stoney = arr.shift(); // Remove the largest stone
      let stonex = arr.shift(); // Remove the second largest stone
      const leftWeight = stoney! - stonex!; // Calculate the remaining weight after smashing the stones

      // If there is any remaining weight, add it back to the heap
      if (leftWeight > 0) {
        arr.push(leftWeight);
        // we have to percolate up but here this percolate up will work on this.heap not on our array
        this.percolateUp(arr.length - 1); 
        // this.maxHeapify(arr); // Re-heapify after adding the new stone
      }

      // Base case: If only one or no stones remain, return the result
      if (arr.length <= 1) {
        return arr.length === 1 ? arr[0] : 0;
      } else {
        return func(arr); // Recursive call to continue processing stones
      }
    };

    return func(arr); // Start the stone smashing process
  }

  // Maintain heap property after extraction
  private minHeapify(index: number) {
    let smallest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      this.minHeapify(smallest);
    }
  }

  // Extract the minimum value (root of the heap)
  extractMin(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.minHeapify(0);
    }
    return min;
  }

  /*
  *****PAGE 13*****
  Video : https://www.youtube.com/watch?v=tJK7vjNKdLY&t=217s
  Sort K sorted array | sort nearly sorted array
  Why It's Called a "K-Sorted Array":
    Displacement Constraint: The defining characteristic of a K-sorted array is that 
    each element can be displaced from its correct sorted position by at most K positions.

    Sorting Potential: The K value indicates how "nearly sorted" the array is. A 
    smaller K means the array is closer to being fully sorted, while a larger K 
    indicates more disorder.

    if there is come chunk in the array we want to sort we usually use insertion sort or heap sort

    Q) is we really using the property of each element can be displaced by K position? (search)
    Ans) yes we are actually by first traversing the array only at K + 1 


    Why K + 1 Elements?
      The reason for using K + 1 elements in the heap is because, in a K-sorted array, the 
      smallest element that should be placed next in the sorted order is guaranteed to be 
      within the first K + 1 elements.
  */

  sortKSortedArray(arr: number[], k: number): number[] {
    const heap = this.heap;
    const result: number[] = [];

    // Step 1: Insert the first K+1 elements into the heap
    for (let i = 0; i <= k; i++) {
      this.insertElement(arr[i]);
    }

    // Step 2: Iterate through the array from index K+1 to the end
    for (let i = k + 1; i < arr.length; i++) {
      result.push(this.extractMin()!);
      this.insertElement(arr[i]);
    }

    // Step 3: Extract the remaining elements from the heap
    while (heap.length > 0) {
      result.push(this.extractMin()!);
    }

    return result;
  }

  public remove(value: number): boolean {
    const index = this.heap.indexOf(value);

    if (index === -1) {
      return false; // Element not found
    }

    // Replace the element to be removed with the last element
    const lastElement = this.heap.pop(); // Remove the last element
    if (index < this.heap.length) {
      this.heap[index] = lastElement !== undefined ? lastElement : value; // Replace with last element
      this.maxHeapifyArrange(this.heap, index); // Restore the heap property
    }

    return true; // Element removed successfully
  }

  public getHeap(): number[] {
    return this.heap;
  }
}

// Example Usage
const heap = new Heap([1, 14, 8, 10, 7, 9, 3, 2, 4, 6]);
console.log("Initial Max Heap:", heap.getHeap());
console.log("Extracted Max:", heap.extractMax());
console.log("Heap after extraction:", heap.getHeap());

// Example usage:
const sortedArray = heap.sortKSortedArray([6, 5, 3, 2, 8, 10, 9], 3);
console.log(sortedArray); // Output: [2, 3, 5, 6, 8, 9, 10]

class MaxHeap {
  private heap: { [key: string]: number }[];

  constructor() {
    this.heap = [];
  }

  private maxHeapify(i: number) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    // Check if the left child is larger than the current largest
    if (left < this.heap.length && this.heap[left][1] > this.heap[largest][1]) {
      largest = left;
    }

    // Check if the right child is larger than the current largest
    if (
      right < this.heap.length &&
      this.heap[right][1] > this.heap[largest][1]
    ) {
      largest = right;
    }

    // If the largest is not the current node, swap and continue heapifying
    if (largest !== i) {
      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      this.maxHeapify(largest);
    }
  }

  public insert(keyValuePair: { [key: string]: number }) {
    this.heap.push(keyValuePair);
    let i = this.heap.length - 1;
    let parent = Math.floor((i - 1) / 2);

    // Percolate up to maintain the max heap property
    while (i > 0 && this.heap[parent][1] < this.heap[i][1]) {
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  public extractMax() {
    if (this.heap.length === 0) {
      return null;
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;

    // Restore the heap property
    this.maxHeapify(0);

    return max;
  }

  public size() {
    return this.heap.length;
  }
}

function topKFrequent(nums: number[], k: number): number[] {
  const frequencyMap: { [key: number]: number } = {};

  // Step 1: Hashing - Calculate frequency of each number in the array
  for (const num of nums) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  }

  const maxHeap = new MaxHeap();

  // Step 2: Build Heap - Insert all frequency map items into the max heap
  for (const key in frequencyMap) {
    maxHeap.insert({ [key]: frequencyMap[key] });
  }

  const result: number[] = [];

  // Step 3: Extract Max K times - Get the top K frequent elements
  for (let i = 0; i < k; i++) {
    const max = maxHeap.extractMax();
    if (max) {
      result.push(parseInt(Object.keys(max)[0]));
    }
  }

  return result;
}

// Example usage:
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // Output: [1, 2]

/* Sliding Window Maximum | Leetcode #239
Video : https://www.youtube.com/watch?v=LiSdD3ljCIE&list=PLEJXowNB4kPyP2PdMhOUlTY6GrRIITx28&index=13s

 Simple approach is to traverse the array and push the maximum number in result array
 Time Complexity is O(NK)
*/

function maxSlidingWindowSimple(nums: number[], k: number): number[] {
  const result: number[] = [];

  for (let i = 0; i <= nums.length - k; i++) {
    let max = nums[i]; // Initialize the max to the first element of the window

    // Traverse the window and find the maximum
    for (let j = i; j < i + k; j++) {
      if (nums[j] > max) {
        max = nums[j];
      }
    }

    // Push the maximum of the current window to the result array
    result.push(max);
  }

  return result;
}

// Example usage:
console.log(maxSlidingWindowSimple([1, 3, -1, -3, 5, 3, 6, 7], 3)); // Output: [3, 3, 5, 5, 6, 7]

class MaxSlidingWindow {
  // Function to push a new element into the max heap
  // heap: The current state of the heap (array of pairs where each pair is [value, index])
  // value: The value to be added to the heap
  // index: The index of the value in the original array
  private pushHeap(
    heap: [number, number][],
    value: number,
    index: number
  ): void {
    // Add the new value and its index as a pair to the heap
    heap.push([value, index]);
    // Ensure the heap maintains its max-heap property by reordering the heap from bottom to top
    this.heapifyUp(heap);
  }

  // Function to pop the root element (maximum) from the heap
  // heap: The current state of the heap
  private popHeap(heap: [number, number][]): void {
    // Remove the last element in the heap and temporarily store it
    const last = heap.pop();
    // If the heap is now empty or the last element is undefined, return early
    if (heap.length === 0 || last === undefined) return;
    // Place the last element at the root of the heap
    heap[0] = last;
    // Restore the max-heap property by reordering the heap from top to bottom
    this.heapifyDown(heap);
  }

  // Function to restore the max-heap property after adding a new element
  // heap: The current state of the heap
  private heapifyUp(heap: [number, number][]): void {
    // Start with the index of the newly added element (last element in the heap array)
    let i = heap.length - 1;
    // Continue until we reach the root of the heap
    while (i > 0) {
      // Calculate the index of the parent element
      const parentIndex = Math.floor((i - 1) / 2);
      // If the parent's value is greater than or equal to the current value, stop
      if (heap[parentIndex][0] >= heap[i][0]) break;
      // Otherwise, swap the current element with its parent to maintain the heap property
      [heap[i], heap[parentIndex]] = [heap[parentIndex], heap[i]];
      // Move up to the parent index and continue the process
      i = parentIndex;
    }
  }

  // Function to restore the max-heap property after removing the root element
  // heap: The current state of the heap
  private heapifyDown(heap: [number, number][]): void {
    // Start with the root element (index 0)
    let i = 0;
    // Get the total number of elements in the heap
    const length = heap.length;
    // Continue the process until the heap property is restored
    while (true) {
      // Calculate the index of the left and right children
      const leftIndex = 2 * i + 1;
      const rightIndex = 2 * i + 2;
      // Assume the current element is the largest
      let largest = i;
      // If the left child exists and is greater than the current element, update the largest index
      if (leftIndex < length && heap[leftIndex][0] > heap[largest][0]) {
        largest = leftIndex;
      }
      // If the right child exists and is greater than the current largest, update the largest index
      if (rightIndex < length && heap[rightIndex][0] > heap[largest][0]) {
        largest = rightIndex;
      }
      // If the largest index is still the current element, the heap property is restored, so break
      if (largest === i) break;
      // Otherwise, swap the current element with the largest child
      [heap[i], heap[largest]] = [heap[largest], heap[i]];
      // Move down to the largest index and continue the process
      i = largest;
    }
  }

  // Function to clean up elements that are out of the current sliding window
  // heap: The current state of the heap
  // currentIndex: The current index in the iteration over the array
  // k: The size of the sliding window
  private cleanHeap(
    heap: [number, number][],
    currentIndex: number,
    k: number
  ): void {
    /* 
      We are checking the first element because, in a max-heap, the maximum value will be at the 0th index.
      If the index of the root element (heap[0][1]) is less than or equal to the index of the element 
      that is out of the current window (currentIndex - k), then it should be removed from the heap.
      basically we are checking that if the current root is in valid window 
      let's understand with example => 
      As we know that in the first window the root will be 3 but it is not at 0th index 
      in the input so we will make it root
      then we are checking that if the max (root) wherever it in the valid window either 
      will be at 0th, 1st, 2nd index is still in the valid window
      valid window can be either first iteration window or second iteration window or can be 3rd 
      in case of if k = 3
      */
    while (heap.length > 0 && heap[0][1] <= currentIndex - k) {
      // Pop the root element if it's out of the current sliding window
      this.popHeap(heap);
    }
  }

  // Main function to find the maximum value in each sliding window of size k
  // nums: The input array of numbers
  // k: The size of the sliding window
  public maxSlidingWindow(nums: number[], k: number): number[] {
    // Initialize the result array to store the maximums
    const result: number[] = [];
    // Initialize the max heap as an array of pairs [value, index]
    const heap: [number, number][] = [];

    // Iterate over each element in the nums array
    for (let i = 0; i < nums.length; ++i) {
      // Clean the heap of elements that are out of the current sliding window
      this.cleanHeap(heap, i, k);

      // Push the current element (with its index) into the heap
      this.pushHeap(heap, nums[i], i);

      /* If the current index is greater than or equal to k - 1, it means we have a valid window
      same condition as cleanHeap while loop condition but reverse
      (i >= k - 1) is used to determine when the sliding window of size k has fully formed or not
      if not then don't pick the element if completely formed then start pushing the element into 
      the result
      Q) why we are taking k - 1 and not k only because technically we'll start pushing numbers 
      into result array if window is equal or greater then k?
      because we are taking 0 base indexing
      To form a complete window of size k, you need to include k elements.
      In a zero-indexed array, the first window that includes exactly k elements starts from index 0 and 
      ends at index k-1.
      */
      if (i >= k - 1) {
        // The root of the heap (heap[0][0]) is the maximum element for the current window
        result.push(heap[0][0]);
      }
    }

    // Return the array of maximums for each sliding window
    return result;
  }
}

// Example usage:
const maxSlidingWindow = new MaxSlidingWindow(); // Create an instance of the MaxSlidingWindow class
const result = maxSlidingWindow.maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3); // Call the maxSlidingWindow method
console.log(result); // Output: [3, 3, 5, 5, 6, 7]

// Merge K sorted lists | Leetcode #23
// Video source : https://youtu.be/kpCesr9VXDA?list=PLEJXowNB4kPyP2PdMhOUlTY6GrRIITx28
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

class MinHeap {
  private heap: ListNode[];

  constructor() {
    // Initialize an empty array to represent the heap
    this.heap = [];
  }

  // Push a new node into the heap and maintain the min-heap property
  push(node: ListNode): void {
    this.heap.push(node); // Add the new node to the end of the array
    this.heapifyUp(this.heap.length - 1); // Rebalance the heap by moving the node up
  }

  // Pop the smallest node from the heap (the root) and maintain the min-heap property
  pop(): ListNode | undefined {
    if (this.heap.length === 0) return undefined; // Return undefined if the heap is empty

    const smallest = this.heap[0]; // The root node is the smallest in the min-heap
    const last = this.heap.pop(); // Remove the last node in the heap

    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last; // Move the last node to the root position
      this.heapifyDown(0); // Rebalance the heap by moving the node down
    }

    return smallest; // Return the smallest node (which was at the root)
  }

  // Heapify up: Rebalance the heap by moving a node up to maintain the min-heap property
  private heapifyUp(index: number): void {
    let i = index;

    while (i > 0) {
      const parentIndex = Math.floor((i - 1) / 2); // Calculate the parent's index

      // If the current node is not smaller than its parent, stop
      if (this.heap[parentIndex].val <= this.heap[i].val) break;

      // Swap the current node with its parent
      [this.heap[i], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[i],
      ];

      // Move up to the parent index
      i = parentIndex;
    }
  }

  // Heapify down: Rebalance the heap by moving a node down to maintain the min-heap property
  private heapifyDown(index: number): void {
    let i = index;
    const length = this.heap.length;

    while (true) {
      const leftIndex = 2 * i + 1; // Left child index
      const rightIndex = 2 * i + 2; // Right child index
      let smallest = i; // Assume the current node is the smallest

      // If the left child exists and is smaller than the current node, update smallest
      if (
        leftIndex < length &&
        this.heap[leftIndex].val < this.heap[smallest].val
      ) {
        smallest = leftIndex;
      }

      // If the right child exists and is smaller than the smallest found so far, update smallest
      if (
        rightIndex < length &&
        this.heap[rightIndex].val < this.heap[smallest].val
      ) {
        smallest = rightIndex;
      }

      // If no smaller child was found, the heap property is restored, and we can stop
      if (smallest === i) break;

      // Swap the current node with the smallest child
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];

      // Move down to the smallest child's index
      i = smallest;
    }
  }

  // Check if the heap is empty
  isEmpty(): boolean {
    return this.heap.length === 0; // Return true if the heap is empty, otherwise false
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // Initialize the min-heap to keep track of the smallest elements across the lists
  const minHeap = new MinHeap();

  // Create a dummy node to help easily return the head of the merged list
  const dummy = new ListNode(0);
  let current = dummy; // Pointer to build the merged list

  // Step 2: Push the first elements of all the k lists into the heap
  for (const list of lists) {
    if (list !== null) {
      minHeap.push(list); // Add the first node of each list to the heap
    }
  }

  // Step 3 & 4: Continuously pop the smallest element from the heap and add it to the merged list
  while (!minHeap.isEmpty()) {
    const smallestNode = minHeap.pop(); // Pop the smallest node from the heap

    if (smallestNode) {
      current.next = smallestNode; // Add the smallest node to the merged list
      current = current.next; // Move the current pointer to the new end of the list

      // first we will push all the nodes of the first (smallestNode) list nodes
      // then will push the all node of second list and then 3rd and so on
      if (smallestNode.next !== null) {
        // If the smallest node's list has more elements, push the next one into the heap
        minHeap.push(smallestNode.next);
      }
    }
  }

  // Return the merged list, which starts at dummy.next
  return dummy.next;
}

// Example usage:
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));
const lists = [list1, list2, list3];

const mergedList = mergeKLists(lists);

// Function to print the merged list
function printList(node: ListNode | null): void {
  let output = ""; // Initialize an empty string to accumulate the output
  while (node !== null) {
    output += `${node.val} -> `; // Append the current node's value to the output string
    node = node.next; // Move to the next node
  }
  output += "null"; // Indicate the end of the list
  console.log(output); // Print the entire accumulated string at once
}

printList(mergedList); // Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6 -> null

/* ############ Find Median from Data Stream ############

For an array with an odd number of elements:

                 (n - 1)
Median =  ------------------------ 
                   2 
For an array with an even number of elements:

          (  n       )      n
          ( ---  - 1 )  +   ------
          (  2       )       2
Median = ----------------------------
                      2
*/

export {};
