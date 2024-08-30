// Circular Queue
// The size of the queue is fixed and a single block of memory is used as if the first
// element is connected to the last element
// Also referred to as circular buffer or ring buffer and follows the FIFO principle
// A circular queue will reuse the empty block created during the dequeue operation
// When working with queues of fixed maximum size, a circular queue is a great
// implementation choice
// The Circular Queue data structure supports two main operations
// Enqueue, which adds an element to the rear/tail of the collection
// Dequeue, which removes an element from the front/head of the collection

export {};

type CircularQueueType<T> = {
  enqueue: (value: T) => void;
  dequeue: () => T | null;
  isFull: () => boolean;
  isEmpty: () => boolean;
  peek: () => T | null;
  getSize: () => number;
};

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class CircularQueue<T> implements CircularQueueType<T> {
  size: number;
  front: Node<T> | null;
  rear: Node<T> | null;
  capacity: number;
  constructor(capacity: number) {
    this.size = 0;
    this.front = null;
    this.rear = null;
    this.capacity = capacity;
  }

  enqueue(value: T) {
    const newNode = new Node(value);
    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
    } else if (this.size === this.capacity) {
      this.dequeue();
      this.enqueue(value);
    } else {
      this.rear!.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }
  dequeue() {
    if (!this.front) return null;
    const frontValue = this.front.value;
    this.front = this.front.next;
    // if (!this.front) this.rear = null;
    this.size--;
    return frontValue;
  }
  isFull() {
    return this.size === this.capacity;
  }
  isEmpty() {
    return this.size === 0;
  }
  peek() {
    return this.front ? this.front.value : null;
  }
  getSize() {
    return this.size;
  }
}

const circularQueue = new CircularQueue<number>(3);
