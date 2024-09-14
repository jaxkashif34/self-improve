/*
The Strategy Pattern is a behavioral design pattern that defines a family  
of algorithms, encapsulates each one, and makes them interchangeable. It  
allows clients to select an algorithm from a family of algorithms at runtime,  
promoting flexibility and reuse. The pattern involves creating a strategy interface  
that each algorithm implements and a context class that uses the strategy.  
This separation allows algorithms to vary independently from clients that use  
them, facilitating easier maintenance and extension of the algorithm family.

*/ 

// Step 1: Define a common interface for payment strategies
interface PaymentStrategy {
  pay(amount: number): void;
}

// Step 2: Implement concrete strategies for each payment method
class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Credit Card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Bitcoin`);
  }
}

// Step 3: Define a context class that will use the strategy
class PaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  executePayment(amount: number) {
    this.strategy.pay(amount);
  }
}

// Example usage:
const payment = new PaymentContext(new CreditCardPayment());
payment.executePayment(100); // Output: Paid 100 using Credit Card

payment.setStrategy(new PayPalPayment());
payment.executePayment(50); // Output: Paid 50 using PayPal
