/*
The Abstract Factory Pattern is a creational design pattern that provides an interface 
for creating families of related or dependent objects without specifying their concrete 
classes. It allows you to produce objects that follow a common theme or category, but the 
exact object type is determined at runtime by the factory implementation. This pattern 
is particularly useful when a system needs to be independent of how its objects are created 
or when dealing with multiple object families. By encapsulating object creation logic, the 
Abstract Factory pattern promotes flexibility and makes it easier to introduce new product 
families.
*/ 

// Button interface
interface Button {
  render(): void;
}

// Checkbox interface
interface Checkbox {
  check(): void;
}

// Windows button implementation
class WindowsButton implements Button {
  render(): void {
    console.log("Rendering a Windows button.");
  }
}

// Mac button implementation
class MacButton implements Button {
  render(): void {
    console.log("Rendering a Mac button.");
  }
}

// Windows checkbox implementation
class WindowsCheckbox implements Checkbox {
  check(): void {
    console.log("Checking a Windows checkbox.");
  }
}

// Mac checkbox implementation
class MacCheckbox implements Checkbox {
  check(): void {
    console.log("Checking a Mac checkbox.");
  }
}

// Abstract factory interface
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete factory for Windows
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

// Concrete factory for Mac
class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Client code that uses the factory
class Application {
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  renderUI(): void {
    this.button.render();
    this.checkbox.check();
  }
}

// Example: Creating a Windows application
const windowsFactory = new WindowsFactory();
const windowsApp = new Application(windowsFactory);
windowsApp.renderUI();
// Output:
// Rendering a Windows button.
// Checking a Windows checkbox.

// Example: Creating a Mac application
const macFactory = new MacFactory();
const macApp = new Application(macFactory);
macApp.renderUI();
// Output:
// Rendering a Mac button.
// Checking a Mac checkbox.
