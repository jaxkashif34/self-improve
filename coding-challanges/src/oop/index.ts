class MyStack {
  private constructor() {}

  static getInstance() {
    return new MyStack();
  }

  speak() {
    return 'Hello World';
  }
}

const myStack = MyStack.getInstance();

myStack.speak();
// @ts-expect-error
class NewClass extends MyStack {} // achieves the Final keyword behavior
