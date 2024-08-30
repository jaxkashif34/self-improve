export {};
class Node<T> {
  value: T;
  next: null | Node<T>;
  previous: null | Node<T>;
  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}
class DoublyLinkedList<T> {
  head: null | Node<T>;
  tail: null | Node<T>;
  size: number;
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }
  isEmpty() {
    return this.size === 0;
  }

  prepend(value: T) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head; // attaching the node.next with the head
      this.head!.previous = node; // attaching the head.previous with the new node
      this.head = node; // update the head pointer
    }
    this.size++;
  }

  append(value: T) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      node.previous = this.tail;
      this.tail = node;
    }
    this.size++;
  }
  removeFromFront() {
    if (this.isEmpty()) return null;
    const removeValue = this.head!.value;
    if (!this.head!.next) { // way to check if there is only one node in list by checking if next node exists or not
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head!.next; // here we are assigning next Node from the head to the head
      // below we are changing the head.previous cuz we already update the value of head above
      this.head.previous = null; // and here we are using the same assigned node and setting its previous value to null
    }
    this.size--;
    return removeValue;
  }
  removeFromLast() {
    if (this.isEmpty()) return null;
    const removeValue = this.tail!.value;
    if (!this.tail!.previous) { // check if there is only one node in the list
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail!.previous; // using the same technique as in removeFromFront method
      this.tail.next = null;
    }
    this.size--;
    return removeValue;
  }

  printReverse() {
    let current = this.tail;
    while (current) {
      console.log(current.value);
      current = current.previous;
    }
  }
  print() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

const list = new DoublyLinkedList();

list.append(1);
list.append(2);
list.removeFromFront();
list.removeFromFront();
list.removeFromFront();
list.print();
