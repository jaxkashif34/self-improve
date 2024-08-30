// Linked List
// A linked list is a linear data structure that includes a series of connected nodes
// Each node consists of a data value and a pointer that points to the next node
// The list elements can be easily inserted or removed without reallocation or
// reorganization of the entire structure
// Random access of elements is not feasible and accessing an element has linear time
// complexity
// The linked list data structure supports three main operations
// Insertion - to add an element at the beginning, end or at a given index in the list
// Deletion - to remove an item given its index or value
// Search - to find an element given its value

export { };
export type NodeType<T> = Node<T> | null;
class Node<T> {
  value: T;
  next: NodeType<T>;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: NodeType<T>;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }
  // O(1)
  prepend(value: T) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  isEmpty() {
    return this.size === 0;
  }
  getSize() {
    return this.size;
  }
  print() {
    let current = this.head;
    if (!current) {
      console.log('list is empty');
    } else {
      while (current !== null) {
        console.log(current.value);
        current = current.next;
      }
    }
  }
  // O(n)
  append(value: T) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      let current = this.head;
      while (current?.next !== null) {
        // this loop runs until it finds out that a node points to null
        current = current!.next;
      }
      current.next = node;
    }

    this.size++;
  }
  inset(value: T, index: number) {
    // basically we are assigning current to previous and current.next to current by this we are making gap at given index let's say given index is 2 then previous points at 1 and current points to 3 if we have an already items in the linked list is 0, 1, 3
    if (index < 0 || index > this.size) {
      console.log('index out of range');
      return;
    }
    if (index === 0) {
      this.prepend(value);
    } else {
      const node = new Node(value);
      let current = this.head;
      let previous: NodeType<T> = null;
      let currentIndex = 0;
      while (currentIndex < index) {
        previous = current;
        current = current!.next;
        currentIndex++;
      }
      previous!.next = node;
      node.next = current;
      this.size++;
    }
  }
  removeFrom(index: number) {
    if (index < 0 || index >= this.size) {
      console.log('index out of range');
      return;
    }
    if (index === 0) {
      let removedNode = this.head;
      this.head = this.head!.next;
      this.size--;
      return removedNode!.value;
    }
    let current = this.head;
    let previous: NodeType<T> = null;
    let currentIndex = 0;
    while (currentIndex < index) {
      previous = current;
      current = current!.next;
      currentIndex++;
    }
    const removedNode = previous!.next;
    previous!.next = current!.next; // we are assigning current.next cuz current is the node we want to remove so we are connecting next node to the current to the previous
    this.size--;
    return removedNode!.value;
  }
  removeValue(value: T) {
    if (this.isEmpty()) {
      console.log('List is empty');
      return;
    }
    if (this.head!.value === value) {
      this.head = this.head!.next;
      this.size--;
      return value;
    }

    let current = this.head;
    let previous: NodeType<T> = null;
    while (current!.value !== value) {
      previous = current;
      current = current!.next;
    }
    const removedValue = current!.value;
    previous!.next = current!.next;
    this.size--;
    return removedValue;
  }
  search(value: T) {
    if (this.isEmpty()) {
      console.log('List is empty');
      return;
    }
    let current = this.head;
    while (current && current.value !== value) {
      current = current.next;
    }
    return current ? current.value : -1;
  }
  reverse() {
    let current = this.head;
    let previous: NodeType<T> = null;
    let next: NodeType<T> = null;
    while (current) {
      next = current.next; // temporarily
      current.next = previous;
      previous = current;
      current = next; // for next iteration
    }
    this.head = previous; // we can't assign current here cuz we are setting current next and at last iteration of node current will set to null and we can't assign null to the this.head
  }

  // method to check if the provided linked list is palindrome or not using stack
  // can be found in PDF (page 18)
  isPalindromeWithStack(head = this.head) {
    /* the way we can use to check if the linked list is palindrome is first traverse through the list and stored
      all the values of nodes in the stack then pop each value and compare with the head value and then with 2nd 
      value with 2nd pop value from the stack and so on if any value will not match return false or if loop ends 
      didn't find any mismatch then when loops ends return true indicates that linked list is palindrome
     */
    if (this.isEmpty()) return false;
    if (this.size === 1 || head?.next === null) return true;
    const stack = [];
    let current = head;
    while (current) {
      stack.push(current.value);
      current = current.next;
    }
    current = head; // we can't use above current value because it was overwritten with the next nodes
    while (current) {
      /* if the list is palindrome then popping out order is same as pushing in so traversing through the list 
      each item is same as popped out item from stack if it isn't same return false
       */
      if (current.value !== stack.pop()) return false;
      current = current.next;
    }
    return true;
  }
  // can be found on PDF
  isPalindromeWithMidPoint(head = this.head) {
    /* in this algo we simple creating another list from midpoint of the original list then after reversing 
    that midpoint list then if the original list is palindrome it will have same order or nodes but midpoint 
    list is only half to the original list then we simply compare each node with the original list and 
    returns false if nodes are not same through loop and the condition of loop is when either of list is 
    not empty runs the loop
     */
    const midpoint = this.findMidPoint(head);
    const tail = this.reverseLinkList(midpoint);
    return this.compareLinkList(head, tail);
  }

  private reverseLinkList(head = this.head) {
    let current = head;
    let previous = null;
    let next = null;

    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    return previous;
  }
  // can be found on PDF (page 19)
  private findMidPoint(head = this.head) {
    /* basically we created a two pointers one (slow) take one step at a time and second (fast) take
     two steps at a time by doing this if fast reaches at the end then slow one will definitely 
     reaches at the middle*/
    let slow = head; // 1st pointer
    let fast = head; // 2nd pointer

    while (fast && fast.next) {
      slow = slow?.next!;
      fast = fast?.next.next;
    }
    return slow;
  }

  private compareLinkList(list1: NodeType<T>, list2: NodeType<T>) {
    while (list1 && list2) {
      if (list1.value !== list2.value) return false;
      list1 = list1.next;
      list2 = list2.next;
    }
    return true;
  }
}
const list = new LinkedList();
list.append(0);
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.removeFrom(2);
list.print();

// LinkedList with tail implementation

class LinkListWithTailPointer<T> {
  head: NodeType<T>;
  tail: NodeType<T>;
  size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
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
      node.next = this.head;
      this.head = node;
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
      this.tail = node;
    }
    this.size++;
  }
  removeFromFront() {
    if (this.isEmpty()) return null;
    const value = this.head?.value;
    this.head = this.head!.next;
    this.size--;
    return value;
  }
  // we can simply track the while loop on PDF (page 19)
  removeFromLast() {
    if (this.isEmpty()) return null;
    const value = this.tail?.value;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // we want to find the second last node so that we can make that node.next to null
      let current = this.head;
      while (current!.next !== this.tail) {
        // iterate in the same way but compare current.next with tail
        /* we are iterating until we reach the second last node that's why we are comparing current.next
         with last element when next element to the current is same as last element (this.tail) stop 
         re-assign to the current variable
        */
        current = current!.next;
      }
      current!.next = null;
      this.tail = current;
    }
    this.size--;
    return value;
  }
  print() {
    let current = this.head;
    if (!current) {
      console.log('list is empty');
    } else {
      while (current !== null) {
        console.log(current.value);
        current = current.next;
      }
    }
  }
}

const llT = new LinkListWithTailPointer();

llT.append(1);
llT.append(2);
llT.append(3);
llT.removeFromLast();
llT.print();
