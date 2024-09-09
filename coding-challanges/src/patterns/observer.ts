interface Observable {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}
class Subject implements Observable {
  private observers: Observer[] = [];
  private state: string[] = [];
  attach(observer: Observer) {
    const isExisted = this.observers.find((obs) => obs.id === observer.id);
    if (isExisted) {
      console.log("you have already subscribed to this subject");
    } else {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer) {
    const observerIndex = this.observers.findIndex(
      (obs) => obs.id === observer.id
    );
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    } else {
      console.log("observer not found");
    }
  }

  notify() {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }

  setState() {
    this.state.push("hey everyone");
    this.notify();
  }
}

interface Observer {
  id: number;
  update(state: string[]): void;
}

class ConcreteObserver1 implements Observer {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  localState: any = null;
  update(state: string[]) {
    console.log("state of 1nd concrete: ", state);

    this.localState = state;
  }
}

class ConcreteObserver2 implements Observer {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  localState: any = null;
  update(state: string[]) {
    console.log("state of 2nd concrete: ", state);
    this.localState = state;
  }
}

const subject = new Subject();
const observer1 = new ConcreteObserver1(1);
subject.attach(observer1);
const observer2 = new ConcreteObserver2(2);
subject.attach(observer2);

subject.setState();
