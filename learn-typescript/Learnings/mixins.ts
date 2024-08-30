/* Again Learning the Mixins
Detail Documentation on Mixins : https://www.digitalocean.com/community/tutorials/typescript-mixins#understanding-the-limitations-of-classes
*/

// In TypeScript, we can’t inherit or extend from more than one class, but Mixins helps us to get around that. Mixins create partial classes that we can combine to form a single class that contains all the methods and properties from the partial classes.

// Understanding the Limitations of Classes


export class Car {
  drive(name:string) {
    console.log(`This ${name} can drive very fast`);
  }
}

export class Lorry {
  carry(weight:number) {
    console.log(`This vehicle can carry ${weight} kg`);
  }
}

// @ts-expect-error
export class Truck extends Car, Lorry {}

// To solve this, we can use mixins.

// Understanding Interface Class Extension and Declaration Merging


// 1) Interface class extension

// interface A extends ClassB, ClassC {}

// When an interface extends a class, it extends only the class members but not their implementation because interfaces don’t contain implementations.

// 2) Declaration merging

// When two or more declarations are declared with the same name, TypeScript merges them into one.

interface Alligator {
  eyes: number;
  nose: number;
}

interface Alligator {
  tail: number;
}

const gator: Alligator = {
  eyes: 2,
  nose: 1,
  tail: 1
};


// Using the Helper Function

// By leveraging these two functionalities in TypeScript, we can create an interface with the same name as Truck and extend both the Car and Lorry classes:


// @ts-expect-error
export class Truck {}
export interface Truck extends Car, Lorry {}


/* 
Due to declaration merging, the Truck class will be merged with the Truck interface. This means that the Truck class will now contain the function definitions from both Car and Lorry classes.

To enable the Truck class to implement the functions inherited from Car and Lorry, we’ll use a helper function found in the TypeScript docs.

The function takes the name of the class to which we want to copy the implementations as the first argument (which in our case is Truck) and takes an array of classes from which we want to copy the implementations as the second argument (which in our case is Car and Lorry).
*/


// the helper function
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

/* 
And here’s how it’s used:
*/ 

applyMixins(Truck, [Car, Lorry]);

/* We can now access the methods in Car and Lorry from a truck object.*/

const truck = new Truck();
truck.drive("truck");
truck.carry(10);

/* 
Output
This truck can drive very fast
This vehicle can carry 10 kg
*/ 


(()=>{
  // clean code of mixins how we can inherit from multiple classes
class Car {
  drive(v: string) { console.log(v) }
}
class Larry {
  pop(v: number) { console.log(v) }
}
class Truck { }
interface Truck extends Car, Larry { }

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

applyMixins(Truck, [Car, Larry])

const truck = new Truck()


truck.drive("horn")
truck.pop(12) 

})()

// Mixins are a way to add functionality to a class by combining it with other classes. They are useful when you want to add functionality to a class without having to modify its original implementation.

// In TypeScript, mixins can be implemented using a combination of class inheritance and function composition. The basic idea is to create a function that takes a base class and returns a new class that extends the base class and adds the desired functionality.

// Here's an example of how you can implement mixins in TypeScript:

// Define a base class
class Base {
  constructor(public x: number, public y: number) {}
}

// Define a mixin function that adds a `log` method to a class
function Loggable<T extends new (...args: any[]) => Base>(BaseClass: T) {
  // The constraint T extends new (...args: any[]) => Base is a type constraint that ensures that the Loggable function can only be applied to classes that have a constructor that takes any number of arguments and returns an instance of the Base class.
  return class extends BaseClass {
    log() {
      console.log(`x: ${this.x}, y: ${this.y}`);
    }
  };
}

// Create a new class that extends the base class and adds the `log` method using the `Loggable` mixin
const LoggableBase = Loggable(Base);
const obj = new LoggableBase(1, 2);
obj.log(); // Output: "x: 1, y: 2"

// In this example, we define a base class Base with two properties x and y. We then define a mixin function Loggable that takes a base class and returns a new class that extends the base class and adds a log method that logs the values of x and y.

// We then create a new class LoggableBase that extends the Base class and adds the log method using the Loggable mixin. We create an instance of LoggableBase and call the log method to log the values of x and y.

// Mixins are useful when you want to add functionality to a class without having to modify its original implementation. They allow you to create reusable pieces of code that can be combined with other classes to add functionality.

// In TypeScript, mixins can be implemented using a combination of class inheritance and function composition. The basic idea is to create a function that takes a base class and returns a new class that extends the base class and adds the desired functionality.