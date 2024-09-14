/*
The Command Pattern is a behavioral design pattern that encapsulates a request  
as an object, allowing you to parameterize clients with queues and requests.  
It also provides support for undoable operations by creating command objects  
that implement a common interface. Each object contains logic to execute  
a specific request, decoupling the sender from the request handler. This separation  
allows for easier management of commands and enhances system flexibility.

*/ 

// ############### Without pattern Example ###############

class CalculatorBad {
  private value: number;
  private history: { action: string; value: number }[];

  constructor() {
    this.value = 0;
    this.history = []; // Holds the history for undo functionality
  }

  // Direct method for adding a value
  add(valueToAdd: number): void {
    this.value += valueToAdd;
    this.history.push({ action: "add", value: valueToAdd }); // Track operation
  }

  // Direct method for subtracting a value
  subtract(valueToSubtract: number): void {
    this.value -= valueToSubtract;
    this.history.push({ action: "subtract", value: valueToSubtract }); // Track operation
  }

  // Direct method for multiplication
  multiply(valueToMultiply: number): void {
    this.value *= valueToMultiply;
    this.history.push({ action: "multiply", value: valueToMultiply }); // Track operation
  }

  // Direct method for division
  divide(valueToDivide: number): void {
    if (valueToDivide === 0) {
      throw new Error("Cannot divide by zero!");
    }
    this.value /= valueToDivide;
    this.history.push({ action: "divide", value: valueToDivide }); // Track operation
  }

  // Undo the last operation
  undo(): void {
    const lastAction = this.history.pop();

    if (!lastAction) {
      console.log("No more actions to undo");
      return;
    }

    switch (lastAction.action) {
      case "add":
        this.value -= lastAction.value; // Reverse the addition
        break;
      case "subtract":
        this.value += lastAction.value; // Reverse the subtraction
        break;
      case "multiply":
        this.value /= lastAction.value; // Reverse the multiplication
        break;
      case "divide":
        this.value *= lastAction.value; // Reverse the division
        break;
      default:
        break;
    }
  }

  // Show current value
  getValue(): number {
    return this.value;
  }
}

// Example usage
const calculatorBad = new CalculatorBad();

// Perform operations directly
calculatorBad.add(10);
console.log(calculatorBad.getValue()); // 10

calculatorBad.subtract(5);
console.log(calculatorBad.getValue()); // 5

calculatorBad.multiply(2);
console.log(calculatorBad.getValue()); // 10

calculatorBad.divide(2);
console.log(calculatorBad.getValue()); // 5

// Undo operations
calculatorBad.undo();
console.log(calculatorBad.getValue()); // 10 (undid division)

calculatorBad.undo();
console.log(calculatorBad.getValue()); // 5 (undid multiplication)

calculatorBad.undo();
console.log(calculatorBad.getValue()); // 10 (undid subtraction)

calculatorBad.undo();
console.log(calculatorBad.getValue()); // 0 (undid addition)

// ############### With pattern Example ###############

// Interface for the command pattern, every command will implement this interface
interface Command {
  execute(currentValue: number): number;
  undo(currentValue: number): number;
}

// Calculator class, which will execute and undo commands
class Calculator {
  private value: number; // Holds the current value of the calculator
  private history: Command[]; // Stores the history of commands executed

  constructor() {
    this.value = 0; // Initialize the value to 0
    this.history = []; // Initialize the history as an empty array
  }

  // Method to execute a command and store it in history
  executeCommand(command: Command): void {
    this.value = command.execute(this.value); // Update the current value using the command's execute method
    this.history.push(command); // Store the command in history for undoing later
  }

  // Method to undo the last command executed
  undo(): void {
    const command = this.history.pop(); // Retrieve the last command from history
    if (command) {
      this.value = command.undo(this.value); // Undo the command to revert the value
    }
  }

  // Get the current value of the calculator (for external usage)
  getValue(): number {
    return this.value;
  }
}

// AddCommand class, implements the Command interface, adds a value to the current value
class AddCommand implements Command {
  private valueToAdd: number;

  constructor(valueToAdd: number) {
    this.valueToAdd = valueToAdd; // Store the value to add
  }

  // Execute method, adds value to the current value
  execute(currentValue: number): number {
    return this.valueToAdd + currentValue;
  }

  // Undo method, subtracts the added value to revert
  undo(currentValue: number): number {
    return this.valueToAdd - currentValue;
  }
}

// SubtractCommand class, implements the Command interface, subtracts a value from the current value
class SubtractCommand implements Command {
  private valueToSubtract: number;

  constructor(valueToSubtract: number) {
    this.valueToSubtract = valueToSubtract; // Store the value to subtract
  }

  // Execute method, subtracts value from the current value
  execute(currentValue: number): number {
    return this.valueToSubtract - currentValue;
  }

  // Undo method, adds back the subtracted value to revert
  undo(currentValue: number): number {
    return this.valueToSubtract + currentValue;
  }
}

// MultiplyCommand class, implements the Command interface, multiplies the current value by a given value
class MultiplyCommand implements Command {
  private valueToMultiply: number;

  constructor(valueToMultiply: number) {
    this.valueToMultiply = valueToMultiply; // Store the value to multiply
  }

  // Execute method, multiplies the current value
  execute(currentValue: number): number {
    return this.valueToMultiply * currentValue;
  }

  // Undo method, divides the current value to revert
  undo(currentValue: number): number {
    return this.valueToMultiply / currentValue;
  }
}

// DivideCommand class, implements the Command interface, divides the current value by a given value
class DivideCommand implements Command {
  private valueToDivide: number;

  constructor(valueToDivide: number) {
    this.valueToDivide = valueToDivide; // Store the value to divide by
  }

  // Execute method, divides the current value
  execute(currentValue: number): number {
    return this.valueToDivide / currentValue;
  }

  // Undo method, multiplies the value to revert the division
  undo(currentValue: number): number {
    return this.valueToDivide * currentValue;
  }
}

// AddThenMultiplyCommand class, a composite command that adds and then multiplies a value
class AddThenMultiplyCommand implements Command {
  private addCommand: AddCommand;
  private multiplyCommand: MultiplyCommand;

  constructor(valueToAdd: number, valueToMultiply: number) {
    // Combine the AddCommand and MultiplyCommand in one
    this.addCommand = new AddCommand(valueToAdd);
    this.multiplyCommand = new MultiplyCommand(valueToMultiply);
  }

  // Execute both the add and multiply operations in sequence
  execute(currentValue: number): number {
    const newValue = this.addCommand.execute(currentValue); // First add
    return this.multiplyCommand.execute(newValue); // Then multiply
  }

  // Undo both the multiply and add operations in reverse order
  undo(currentValue: number): number {
    const newValue = this.multiplyCommand.undo(currentValue); // First undo multiply
    return this.addCommand.undo(newValue); // Then undo add
  }
}

// Example usage:
const calculator = new Calculator();
const addCommand = new AddCommand(10);
const multiplyCommand = new MultiplyCommand(2);

// Executing commands
calculator.executeCommand(addCommand);
console.log(calculator.getValue()); // Output: 10

calculator.executeCommand(multiplyCommand);
console.log(calculator.getValue()); // Output: 20

// Undoing the last command (multiply)
calculator.undo();
console.log(calculator.getValue()); // Output: 10

// Undoing the previous command (add)
calculator.undo();
console.log(calculator.getValue()); // Output: 0
