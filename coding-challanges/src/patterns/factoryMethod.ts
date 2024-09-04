// Step 1: Define the product interface
interface Transport {
  deliver(): void;
}

// Step 2: Implement concrete products
class Car implements Transport {
  deliver(): void {
    console.log("Delivering by car.");
  }
}

class Bike implements Transport {
  deliver(): void {
    console.log("Delivering by bike.");
  }
}

// Step 3: Define the creator (factory) abstract class
abstract class TransportFactory {
  abstract createTransport(): Transport;

  // Some logic that works with the transport object
  planDelivery(): void {
    const transport = this.createTransport();

    /* do something with transport check wheater is it good enough for delivery ? or not 
      if yes call the delivery method otherwise throw error
      */
    transport.deliver();
  }
}

// Step 4: Implement concrete creators (factories)
class CarFactory extends TransportFactory {
  createTransport(): Transport {
    return new Car();
  }
}

class BikeFactory extends TransportFactory {
  createTransport(): Transport {
    return new Bike();
  }
}

// Step 5: Use the factories
function clientCode(factory: TransportFactory) {
  factory.planDelivery();
}

// Creating and using a CarFactory
const carFactory = new CarFactory();
clientCode(carFactory); // Output: Delivering by car.

// Creating and using a BikeFactory
const bikeFactory = new BikeFactory();
clientCode(bikeFactory); // Output: Delivering by bike.
