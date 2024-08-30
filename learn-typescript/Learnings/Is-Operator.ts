/*

Learning this topic 2nd times with good documentation
Question : Don't we use a simple function that returns boolean value without using "is" keyword
Answer : When you define a type predicate with the is keyword, you're not only checking the type but also informing the TypeScript compiler about the type narrowing that occurs. This means that within the block where the type predicate is used, TypeScript has more precise knowledge of the variable's type. This can be very helpful, especially when dealing with union types, where a variable can have more than one possible type.



*/
type Species = 'cat' | 'dog';

// type also should try interface

interface Pet {
  species: Species;
}

class Cat implements Pet {
  public species: Species = 'cat';
  public meow(): void {
    console.log('Meow');
  }
}

const p: Pet = new Cat();

if (p.species === 'cat') {
  // this will not work
  // @ts-expect-error
  // p.meow() ERROR: Property 'meow' does not exist on type 'Pet'.
  p.meow();
}

function petIsCat(pet: Pet): pet is Cat {
  return pet.species === 'cat';
}

if (petIsCat(p)) {
  p.meow(); // now compiler knows for sure that the variable is of type Cat and it has meow method
}

// By using the is operator and a user-defined type guard function, we can narrow the type of the animal variable in the if block to just Dog. This allows us to call the bark method of the Dog object without getting a type error.

interface Dog {
  name: string;
  bark(): void;
}

// The isDog function returns a boolean value, but more importantly, it has a special return type of obj is Dog. This tells TypeScript that if the function returns true, then the argument is a Dog object.
// then we can safely consider that the animal is a Dog and we can use the methods or properties on Dog type
function isDog(obj: any): obj is Dog {
  return obj && typeof obj.name === 'string' && typeof obj.bark === 'function';
}

function makeDogSpeak(animal: Dog | string) {
  if (isDog(animal)) {
    animal.bark();
  } else {
    console.log(`Sorry, ${animal} cannot bark.`);
  }
}
export {};
