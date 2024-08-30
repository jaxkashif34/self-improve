// The queue data structure is a sequential collection of elements that follows the
// principle of First In First Out (FIFO)
// The first element inserted into the queue is first element to be removed
// A queue of people. People enter the queue at one end (rear/tail) and leave the
// queue from the other end (front/ head).
// Queue is an abstract data type. It is defined by its behavior rather than being a
// mathematical model
// The Queue data structure supports two main operations
// Enqueue, which adds an element to the rear/tail of the collection
// Dequeue, which removes an element from the front/head of the collection

// UseFull Applications
// Printers
// CUP task Scheduling
// callback queue in javascript runtime

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Queue<T> {
  size: number;
  front: Node<T> | null;
  rear: Node<T> | null;
  constructor() {
    this.size = 0;
    this.front = null;
    this.rear = null;
  }

  enqueue(value: T) {
    const newNode = new Node(value);

    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear!.next = newNode; // this will add the new node to the previous one (on next property)
      this.rear = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (!this.front) return null;

    const frontValue = this.front.value;

    this.front = this.front.next;

    if (!this.front) this.rear = null;
    this.size--;
    return frontValue;
  }

  peek() {
    return this.front ? this.front.value : null;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
queue.dequeue();
console.log(queue.peek());

export {};
