/*
The Null Object Pattern is a design pattern used to handle the absence of an 
object by providing a default "null" object that exhibits the same interface 
as regular objects. Instead of using null or undefined values that require 
conditional checks, a null object ensures that the program continues to function 
without throwing errors. It simplifies code by eliminating the need for repetitive 
null checks, making the logic more concise and readable. The null object typically 
performs no operation or returns default values, but it still conforms to the 
expected behavior of the regular objects.
*/ 

// Define the User class with proper types for properties and methods
class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // Method to check if the user has access
  hasAccess(): boolean {
    return this.name === "Bob"; // Only "Bob" has access
  }
}

// Array of User objects
const users: User[] = [new User(1, "Bob"), new User(2, "John")];

// Function to retrieve a user by ID, may return undefined if no user is found
function getUser(id: number): User | undefined {
  return users.find((user) => user.id === id);
}

// Function to print the user information based on ID
function printUser(id: number): void {
  const user = getUser(id);

  /*
    We need to explicitly tell the console.log to print `Guest` if the user does 
    not have a name
    This is problematic since we need to remember to always put this every time 
    we use the users name
    It is also bad because if we want to print `Unknown User` instead, we would need 
    to change every place that we put `Guest` which will most likely be all over the application
  */

  let name = "Guest";
  if (user != null && user.name != null) name = user.name;
  console.log("Hello " + name);

  /*
    This will throw an error if we don't first check that the user object has this 
    function available and isn't null.
    This is a lot of extra code to add in every time we want to check user access, and 
    could cause bugs that are easy to miss if we forget to do the null checks.
  */

  // Simplify access check with optional chaining
  if (user != null && user.hasAccess != null && user.hasAccess()) {
    console.log("You have access");
  } else {
    console.log("You are not allowed here");
  }
}

// Example usage
printUser(1); // Output: Hello Bob, You have access
printUser(2); // Output: Hello John, You are not allowed here
printUser(3); // Output: Hello Guest, You are not allowed here

// user will be the same

// Define the NullUser class to represent a default guest user
class NullUser {
  id: number;
  name: string;

  constructor() {
    this.id = -1;
    this.name = "Guest";
  }

  // NullUser does not have access
  hasAccess(): boolean {
    return false;
  }
}

// Function to get a user by ID, returning a NullUser if not found
function getUser2(id: number): User | NullUser {
  const user = users.find((user) => user.id === id);

  // If no user is found, return a NullUser object
  if (user == null) {
    return new NullUser();
  } else {
    return user;
  }
}

// Function to print user details
function printUser2(id: number): void {
  const user = getUser2(id);
  console.log("Hello " + user.name);

  // Check access based on the user type
  if (user.hasAccess()) {
    console.log("You have access");
  } else {
    console.log("You are not allowed here");
  }
}

// Example usage
printUser(1); // Output: Hello Bob, You have access
printUser(3); // Output: Hello Guest, You are not allowed here
