// Since Stack with array is pretty simple let's create stack without using array
class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Stack<T> {
  private size: number;
  private top: Node<T> | null;
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(value: T) {
    const newNode = new Node(value);
    if (!this.top) this.top = newNode;
    else {
      newNode.next = this.top; // by this we are creating a nested StackNodes
      this.top = newNode;
    }

    this.size++;
  }

  pop(): T | null {
    if (!this.top) return null;
    const topValue = this.top.value;
    this.top = this.top.next;
    this.size--;
    return topValue;
  }

  peek(): T | null {
    return this.top ? this.top.value : null;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  toString(): string {
    let result = '';
    let current = this.top;
    while (current !== null) {
      result += current.value + (current.next ? ' -> ' : '');
      current = current.next;
    }
    return result || 'Stack is empty';
  }
}

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.toString();
console.log(stack.peek());

export {};
