/*
The Decorator Pattern is a structural design pattern that allows you to  
dynamically add behavior or responsibilities to objects without modifying their  
structure. It involves creating a set of decorator classes that are used  
to wrap concrete components. These decorators extend the functionality of the  
wrapped objects by adding new features or modifying existing ones, while  
preserving the original object's interface. This pattern promotes flexibility and  
adheres to the open/closed principle, allowing objects to be extended without  
changing their code.

*/ 

// ########### BAD Example ############
class Coffee {
  cost(): number {
    return 5;
  }
}

class CoffeeWithMilk {
  cost(): number {
    return 7;
  }
}

class CoffeeWithMilkAndSugar {
  cost(): number {
    return 8;
  }
}

// You need new classes for each combination, which isn't flexible.

// ############ Good Approach #############

// Step 1: Define the Coffee interface
interface Coffee {
  cost(): number;
  description(): string;
}

// Step 2: Create the basic Coffee class
class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return "Simple coffee";
  }
}

// Step 3: Create a decorator class that implements Coffee and takes a Coffee object
class MilkDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost() + 2; // Adding cost for milk
  }

  description(): string {
    return this.coffee.description() + ", with milk";
  }
}

// Another decorator for adding sugar
class SugarDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost() + 1; // Adding cost for sugar
  }

  description(): string {
    return this.coffee.description() + ", with sugar";
  }
}

// Step 4: Use the decorators
let myCoffee: Coffee = new SimpleCoffee();
console.log(myCoffee.description()); // Output: Simple coffee
console.log(myCoffee.cost()); // Output: 5

// Add milk to the coffee
myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.description()); // Output: Simple coffee, with milk
console.log(myCoffee.cost()); // Output: 7

// Add sugar to the coffee
myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.description()); // Output: Simple coffee, with milk, with sugar
console.log(myCoffee.cost()); // Output: 8
