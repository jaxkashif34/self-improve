// basically in operator is used to check if some property is existed in that object or not like name is existed in person
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: 'John',
  age: 30,
};

if ('name' in person) {
  console.log(person.name); // Output: "John"
}

if ('gender' in person) {
  console.log(person.gender); // This block will not be executed because "gender" does not exist in the "person" object
}
