/*
The Builder Pattern is a creational design pattern that allows constructing complex objects  
step by step. It separates the construction of an object from its representation, allowing  
the same construction process to create different types of objects. The builder pattern is  
especially useful when an object requires many configuration options or has multiple components  
that need to be constructed in a specific sequence. It promotes flexibility, as you  
can reuse the same building process for different objects, ensuring that each object  
is created correctly, without requiring a large constructor or numerous parameters.
*/

class UserProfileBad {
  name: string;
  age: number;
  email: string;
  address: string;

  constructor(name: string, age: number, email: string, address: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.address = address;
  }
}

// Example usage
const userProfileBad = new UserProfileBad(
  "John Doe",
  30,
  "john@example.com",
  "123 Street, NY"
);
/*
This approach works, but if you want to add more optional fields, or change 
the order of arguments, it becomes messy.
if we didn't want to pass any then we have to pass undefined or null which 
will look nasty for large objects 
*/
console.log(userProfileBad);

// UserProfile class we want to build
class UserProfile {
  name: string;
  age: number;
  email: string;
  address: string;

  constructor(builder: UserProfileBuilder) {
    this.name = builder.name;
    this.age = builder.age;
    this.email = builder.email;
    this.address = builder.address;
  }

  // Optional: A method to display the user profile information
  getInfo(): string {
    return `Name: ${this.name}, Age: ${this.age}, Email: ${this.email}, Address: ${this.address}`;
  }
}

// Builder class
class UserProfileBuilder {
  name: string = "";
  age: number = 0;
  email: string = "";
  address: string = "";

  // Methods to set each attribute (returning the builder object for method chaining)
  setName(name: string): this {
    this.name = name;
    return this;
  }

  setAge(age: number): this {
    this.age = age;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setAddress(address: string): this {
    this.address = address;
    return this;
  }

  // Build method to create the final UserProfile object
  build(): UserProfile {
    return new UserProfile(this);
  }
}

// Example usage
const userProfile = new UserProfileBuilder()
  .setName("Jane Doe")
  .setAge(25)
  .setEmail("jane@example.com")
  .setAddress("456 Road, NY")
  .build();

console.log(userProfile.getInfo()); // Name: Jane Doe, Age: 25, Email: jane@example.com, Address: 456 Road, NY
