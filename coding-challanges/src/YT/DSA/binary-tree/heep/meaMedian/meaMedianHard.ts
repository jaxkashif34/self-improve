class Heap<T> {
  heap: T[];
  compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.heap = [];
    this.compare = compare;
  }

  /**
   * Gets the root of the heap (i.e., the first element).
   * @returns The root element.
   */
  getRoot(): T | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  /**
   * Adds an element to the heap.
   * @param element The element to add.
   */
  add(element: T): void {
    this.heap.push(element);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * Removes and returns the root of the heap.
   * @returns The root element.
   */
  removeRoot(): T | null {
    if (this.heap.length === 0) return null;

    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return root;
  }

  /**
   * Heapifies up the element at index `i` to maintain heap property.
   * @param i The index of the element to heapify up.
   */
  private heapifyUp(i: number): void {
    const parentIndex = Math.floor((i - 1) / 2);
    if (i > 0 && this.compare(this.heap[i], this.heap[parentIndex]) < 0) {
      [this.heap[i], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[i],
      ];
      this.heapifyUp(parentIndex);
    }
  }

  /**
   * Heapifies down the element at index `i` to maintain heap property.
   * @param i The index of the element to heapify down.
   */
  private heapifyDown(i: number): void {
    const leftIndex = 2 * i + 1;
    const rightIndex = 2 * i + 2;
    let smallest = i;

    if (
      leftIndex < this.heap.length &&
      this.compare(this.heap[leftIndex], this.heap[smallest]) < 0
    ) {
      smallest = leftIndex;
    }

    if (
      rightIndex < this.heap.length &&
      this.compare(this.heap[rightIndex], this.heap[smallest]) < 0
    ) {
      smallest = rightIndex;
    }

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.heapifyDown(smallest);
    }
  }
}

class MedianFinder {
  private maxHeap: Heap<number>; // Max-Heap to store the lower half of the elements
  private minHeap: Heap<number>; // Min-Heap to store the upper half of the elements

  constructor() {
    // Max-Heap to maintain the smaller half (use a reverse comparison for max-heap)
    this.maxHeap = new Heap<number>((a, b) => b - a);
    // Min-Heap to maintain the larger half
    this.minHeap = new Heap<number>((a, b) => a - b);
  }

  /**
   * Adds a number to the data structure.
   * @param num The number to be added.
   */
  addNum(num: number): void {
    // Case 1: If both heaps are empty, simply add the number to the max heap
    if (this.maxHeap.heap.length === 0) {
      /* we have assume that first we'll push the element into the maxHeap and
      if lSize===0 its means both are empty and we'll push into maxHeap
      */
      this.maxHeap.add(num);
    }
    // Case 2: If the heaps are of equal size
    else if (this.maxHeap.heap.length === this.minHeap.heap.length) {
      /* if both are of same size then we will grow the maxHeap we discussed that in a video
      but we don't know what number will come so we check if incoming number is greater then
      root of minHeap then we'll push that number into maxHeap (left side)
      */

      // Check if the number is greater than the root of the min heap
      if (num > this.minHeap.getRoot()!) {
        // If true, move the root of the min heap to the max heap
        const temp = this.minHeap.removeRoot()!;
        this.maxHeap.add(temp);

        // Add the new number to the min heap
        this.minHeap.add(num);
      } else {
        // If the number is not greater than the root of the min heap,
        // simply add it to the max heap
        this.maxHeap.add(num);
      }
    }
    // Case 3: If the max heap has one more element than the min heap
    else {
      // Check if the min heap is empty
      if (this.minHeap.heap.length === 0) {
        // If min heap is empty, compare the number with the root of the max heap
        if (num > this.maxHeap.getRoot()!) {
          // If the number is greater, add it directly to the min heap
          this.minHeap.add(num);
        } else {
          // If the number is smaller or equal, move the root of the max heap to the min heap
          const temp = this.maxHeap.removeRoot()!;
          this.minHeap.add(temp);

          // Add the new number to the max heap
          this.maxHeap.add(num);
        }
      }
      // Check if the number is greater than or equal to the root of the min heap
      else if (num >= this.minHeap.getRoot()!) {
        // If true, add the number to the min heap
        this.minHeap.add(num);
      } else {
        // If the number is smaller than the root of the min heap
        // Check if it is smaller than the root of the max heap
        if (num < this.maxHeap.getRoot()!) {
          // Move the root of the max heap to the min heap
          const temp = this.maxHeap.removeRoot()!;
          this.minHeap.add(temp);

          // Add the new number to the max heap
          this.maxHeap.add(num);
        } else {
          // Otherwise, add the number directly to the min heap
          this.minHeap.add(num);
        }
      }
    }
  }

  /**
   * Finds the median of all numbers added so far.
   * @returns The median value.
   */
  findMedian() {
    if (this.maxHeap.getRoot() === null) {
      throw new Error("No elements added yet.");
    }
    if (this.maxHeap.heap.length > this.minHeap.heap.length) {
      // Max-Heap has more elements, return the root of maxHeap
      return this.maxHeap.getRoot();
    } else {
      // Both heaps are of the same size, return the average of the roots
      return (this.maxHeap.getRoot()! + this.minHeap.getRoot()!) / 2;
    }
  }
}

// Example usage:
const medianFinder = new MedianFinder();
medianFinder.addNum(1);
console.log(medianFinder.findMedian()); // Output: 1
medianFinder.addNum(2);
console.log(medianFinder.findMedian()); // Output: 1.5
medianFinder.addNum(3);
console.log(medianFinder.findMedian()); // Output: 2
medianFinder.addNum(4);
console.log(medianFinder.findMedian()); // Output: 2.5
medianFinder.addNum(5);
console.log(medianFinder.findMedian()); // Output: 3
medianFinder.addNum(6);
console.log(medianFinder.findMedian()); // Output: 3.5
medianFinder.addNum(7);
console.log(medianFinder.findMedian()); // Output: 4
// class MedianFinder {
//   // Max heap to store the smaller half of the elements (negative values for max-heap simulation)
//   private maxHeap: number[] = [];
//   // Min heap to store the larger half of the elements
//   private minHeap: number[] = [];

//   constructor() {}

//   /**
//    * Adds a number to the data structure.
//    * @param num The number to be added.
//    */
//   addNum(num: number): void {
//     // Determine the sizes of the heaps
//     const lSize = this.maxHeap.length;
//     const rSize = this.minHeap.length;

//     if (lSize === 0) {

//       this.maxHeap.push(num);
//     } else if(lSize === rSize){

//         if(num < this.minHeap)
//     }
//   }

// }
