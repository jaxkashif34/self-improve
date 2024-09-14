/*
The Observer Pattern is a behavioral design pattern that defines a one-to-many  
dependency between objects. When the state of one object (the subject) changes,  
all dependent objects (observers) are notified and updated automatically. This  
pattern helps in creating a subscription mechanism where multiple observers  
can subscribe to changes in the subject and react accordingly. It promotes  
loose coupling between the subject and observers, allowing them to interact  
independently while maintaining synchronization. The Observer Pattern is often  
used in event handling systems and other scenarios where changes in one  
component need to be reflected in others.

*/ 

// Interface for the Observable in the Observer pattern
// The Observable can attach, detach, and notify observers
interface Observable {
  // Method to attach an observer
  attach(observer: Observer): void;
  // Method to detach an observer
  detach(observer: Observer): void;
  // Method to notify all attached observers of a state change
  notify(): void;
}

// Subject class that implements the Observable interface
// This is the entity that observers are watching for changes
class Subject implements Observable {
  // Array to keep track of attached observers
  private observers: Observer[] = [];
  // State that the observers will be notified about when it changes
  private state: string[] = [];

  // Method to attach (subscribe) an observer to the subject
  attach(observer: Observer) {
    // Check if the observer is already attached
    const isExisted = this.observers.find((obs) => obs.id === observer.id);
    if (isExisted) {
      console.log("You have already subscribed to this subject");
    } else {
      // If the observer is not yet attached, add it to the observers array
      this.observers.push(observer);
    }
  }

  // Method to detach (unsubscribe) an observer from the subject
  detach(observer: Observer) {
    // Find the index of the observer in the observers array
    const observerIndex = this.observers.findIndex(
      (obs) => obs.id === observer.id
    );
    // If the observer is found, remove it from the observers array
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    } else {
      console.log("Observer not found");
    }
  }

  // Method to notify all attached observers of a change in the subject's state
  notify() {
    // Loop through each observer and call their update method with the current state
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }

  // Method to modify the state of the subject
  // After changing the state, all observers are notified
  setState() {
    // Push a new state value to the state array
    this.state.push("hey everyone");
    // Notify all observers about the state change
    this.notify();
  }
}

// Interface for the Observer in the Observer pattern
// An observer must implement the update method
interface Observer {
  id: number; // Unique identifier for each observer
  // Method to update the observer with the latest state of the subject
  update(state: string[]): void;
}

// Concrete implementation of the Observer interface
// This observer will react to state changes in the subject
class ConcreteObserver1 implements Observer {
  id: number; // Unique identifier for this observer
  localState: any = null; // Local copy of the subject's state

  constructor(id: number) {
    this.id = id; // Assign unique ID to the observer
  }

  // Update method that will be called by the subject when its state changes
  update(state: string[]) {
    // Log the updated state received from the subject
    console.log("State of 1st concrete observer: ", state);
    // Store the state locally in this observer
    this.localState = state;
  }
}

// Another concrete implementation of the Observer interface
// This observer behaves similarly to ConcreteObserver1 but with a different ID
class ConcreteObserver2 implements Observer {
  id: number; // Unique identifier for this observer
  localState: any = null; // Local copy of the subject's state

  constructor(id: number) {
    this.id = id; // Assign unique ID to the observer
  }

  // Update method that will be called by the subject when its state changes
  update(state: string[]) {
    // Log the updated state received from the subject
    console.log("State of 2nd concrete observer: ", state);
    // Store the state locally in this observer
    this.localState = state;
  }
}

// Create a new subject instance (the entity being observed)
const subject = new Subject();

// Create new observer instances (the entities observing the subject)
const observer1 = new ConcreteObserver1(1); // Observer with ID 1
subject.attach(observer1); // Attach observer1 to the subject

const observer2 = new ConcreteObserver2(2); // Observer with ID 2
subject.attach(observer2); // Attach observer2 to the subject

// Change the state of the subject, which will trigger notifications to all observers
subject.setState();

// Output:
// State of 1st concrete observer:  ["hey everyone"]
// State of 2nd concrete observer:  ["hey everyone"]
