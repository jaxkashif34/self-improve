// how we can use the readonly keyword to make properties read-only and immutable in TypeScript.
// one way to make a property read-only is to use the readonly keyword in front of the property name when we declare it.
// type Cat = {
//   readonly name: string;
//   breed: string;
// };

type Cat = {
  name: string;
  breed: string;
};

// other way to make a whole object read-only is to use the Readonly<Type> utility type.
// The Readonly<Type> utility type takes a type and returns a new type with all the properties set to read-only,
const makeCat = (name: string, breed: string): Readonly<Cat> => {
  return { name, breed };
};

const cat = makeCat('Garfield', 'Persian');
// cat.name = 'Tom'; // Cannot assign to 'name' because it is a read-only property.

const makeCoordinate = (x: number, y: number, z: number): [number, number, number] => {
  return [x, y, z];
};

const c1 = makeCoordinate(10, 20, 30);

//  how we make array read-only

const reallyConst = [1, 2, 3, 4] as readonly number[]; // this is one way to make array read-only;
const reallyConst2 = [1, 2, 3, 4] as const // this is also a way to make array read-only;
// reallyConst[0] = 50; // Cannot assign to '0' because it is a read-only property.
