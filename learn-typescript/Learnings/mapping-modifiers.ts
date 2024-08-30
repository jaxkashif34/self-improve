// Removes 'readonly' attributes from a type's properties
type CreateMutable<Object_Type> = {
  -readonly [keys in keyof Object_Type]: Object_Type[keys];
};
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>; // now we can mutate the LockedAccount

// Remove 'optional' from a type's properties

type Concrete<Object_Type> = {
  [properties in keyof Object_Type]-?: Object_Type[properties];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>; // now there is no any optional fields in User Type

//   Key Remapping via "as" with template literals
// properties will convert into get[PropertyName] and if we want to change the type of properties also we need to change whatever property we want we can replace them like given below (replace with boolean each property in below) and then what Object we pass will convert into boolean value like in given below (but there a bug in this approach if a property have also a object property like location : { latitude: string, longitude: string }) then this code will replace the location property into boolean instead of converting there sub-property into boolean so we have to modify it
//   type MapTypeWithNewProperties<Object_Type> = {
//     [property in keyof Object_Type as `get${Capitalize<property & string>}`]: boolean;
//   };
type MapTypeWithNewProperties<Object_Type> = {
  [property in keyof Object_Type as `get${Capitalize<property & string>}`]: Object_Type[property];
};
// this type will be used when creating properties for the sub-properties of the object properties of the original object type
// this type will only convert the sub-properties of the object properties of the original object type into boolean
type MapTypeWithNewPropertiesAndSubProperties<Object_Type> = {
  [property in keyof Object_Type as `get${Capitalize<property & string>}`]: Object_Type[property] extends object
    ? {
        [subProperty in keyof Object_Type[property] as `get${Capitalize<subProperty & string>}`]: boolean;
      }
    : boolean;
};

// recursion version of the above type and this will convert all the sub-properties of the object properties of the original object type into boolean

type MapTypeWithNewPropertiesAndSubProperties2<Object_Type> = {
  [property in keyof Object_Type as `get${Capitalize<property & string>}`]: Object_Type[property] extends object ? MapTypeWithNewPropertiesAndSubProperties2<Object_Type[property]> : boolean;
};

type MapUser = {
  name: string;
  age: number;
  location: {
    latitude: number;
    longitude: number;
  };
};

type GetUser = MapTypeWithNewPropertiesAndSubProperties2<MapUser>;

const user: GetUser = {
  // even though when we hover it is not showing that the sub-properties  is converted into boolean but here we can see that the sub-properties is converted into boolean by analyzing the type of user
  getAge: true,
  getLocation: {
    getLatitude: true,
    getLongitude: true,
  },
  getName: true,
};

// Remove the property from Object Type

type RemoveProperty<Object_Type, K extends keyof Object_Type> = {
  [property in keyof Object_Type as Omit<property, K> & string]: Object_Type[property]; // here we are dealing the same error we have seen before of (string & property)
  // explanation is provided here learn-typescript\Learnings\mapped.ts (line 39)
};

interface Circle {
  kind: 'circle';
  radius: number;
}

type KindLessCircle = RemoveProperty<Circle, 'kind'>; // In this type we remove the kind property from Circle type

//   const circle: Circle = {
//     kind: 'circle',
//     radius: 10,
//   };

type EventConfig<Events extends { kind: string }> = {
  // ensuring that Events Type have a property of kind and the value of kind is string
  [E in Events as E['kind']]: (event: E) => void;
  // it is create a method with the name of whatever comes from kind value and the method accepts a parameter of type E and return void
};

type SquareEvent = { kind: 'square'; x: number; y: number };
type CircleEvent = { kind: 'circle'; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>; // In this type we have a object which have two functions which accepts a parameter of type SquareEvent and CircleEvent and return void respectively
const config: Config = {
  circle: (e) => e.radius,
  square: (e) => e.x,
};

//   Mapped type with Conditional type

type ExtractPII<Object_Type> = {
  // this type is used to check weather the value object of id and name have a property of pii and if it have then it will return true otherwise false
  [property in keyof Object_Type]: Object_Type[property] extends { pii: true } ? true : false;
};

//   extends { pii: true } this is used to ensure that if the provided Object_Type have that property with same data-type

type DBFields = {
  id: { format: 'incrementing' };
  name: { type: string; pii: true };
};

type ObjectNeedingGDPRDeletion = ExtractPII<DBFields>;

export {};
