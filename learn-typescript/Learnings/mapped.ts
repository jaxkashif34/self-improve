// how we can create flexible interfaces and types in TypeScript using mapped types (means we can add as many keys as needed)
// I found the two possible way to do that
// one way is by using Record<key Type, value Type>
// another way is by [key:key-Type]: value Type in the interface or in Type
type FlexibleDogInfo1 = {
  // but here is a catch in this method and that is even though we are not tell that keys type might be number but when we get the type of keys it will also add number type... as we can see the in this example we are telling that keys type must be number but ts will also number key type
  [key: string]: string;
};

type TypeOFFlexibleDogInfo1 = keyof FlexibleDogInfo1; // string | number

type FlexibleDogInfo = {
  // good way to add dynamic keys
  name: string;
} & Record<string, string>;

const dog: FlexibleDogInfo = {
  name: 'dog',
  breed: 'dachshund',
  age: '6',
};

type DogInfo = {
  name: string;
  age: number;
};

// below code is convert the value of every key of provided Object-Type into a boolean type
type OptionsFlags<Type> = {
  [property in keyof Type]: boolean; // this will iterate over every key of the provided Object-Type and convert the value of every key into a boolean type
};

type DogInfoOptions = OptionsFlags<DogInfo>;

// let's do a practical example

type Listeners<Type> = {
  [property in keyof Type as `on${Capitalize<string & property>}Change`]: (newValue: Type[property]) => void;
  // Question Why we are doing this <string & property> adding string with property ?
  //   In terms of the explanation, the error is occurring because TypeScript is inferring the type of the property variable to be keyof Type, which is a union of string, number, and symbol keys.

  // When we try to use this variable as a key in the resulting object type, TypeScript expects the key to be a string, but it is not guaranteed to be a string because it could also be a number or symbol.

  // By adding the extends string constraint to the property variable, we are ensuring that it is always a string, which allows us to use it as a key in the resulting object type without any errors.
} & { [property in keyof Type as `on${Capitalize<string & property>}Delete`]: () => void };

const listenToObject = <T>(obj: T, listeners: Listeners<T>): void => {
  // so even though we are not passing a generic type when calling listenToObject function but ts will automatically infer the type of T and the type of T will be DogInfo object
  throw 'need to be implemented';
};

const lg: DogInfo = {
  name: 'Dog',
  age: 13,
};

type ListenerDogInfo = Listeners<DogInfo>;

listenToObject(lg, { onNameChange: (v: string) => {}, onAgeChange: (v: number) => {}, onAgeDelete: () => {}, onNameDelete: () => {} });
