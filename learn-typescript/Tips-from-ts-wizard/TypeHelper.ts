type Obj = {
  id: string;
  name: string;
  age: number;
  sum: () => number;
};

type StringKeys = {
  [K in keyof Obj]: Obj[K] extends string ? K : never;
  /*by doing this, we are just setting the "key" of object to the "value of that key"
       if it's string otherwise set it to never (we will take the advantage of never later)
       when we use "keyof Obj" operator, it will return the union of all keys 
       of that object that are not never */
}[keyof Obj]; /* Immediate indexed mapped type (IMT)
                 so this is just like we get a value from object with bracket notation in js 
                for example obj['id'] but here we are doing directly on object bracket but in 
                js we do on object name we use for example (const person = {id:1} => person["id"])*/

/* we can also do it like so (which is what exactly we are doing above) */
type StringKeys2 = {
  [K in keyof Obj]: Obj[K] extends string ? K : never;
}['id' | 'name' | 'age'];

type A = StringKeys2; // "id" | "name"
// now convert it into generic type

type ExtractStringKeys<T extends object> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type B = ExtractStringKeys<Obj>; // "id" | "name"

// ************ Return never ****************

const raise = (message: string): never => {
  throw new Error(message);
};

const Page = (props: { params: Record<string, string | undefined> }) => {
  const id = props.params.id; // string | undefined
  /* at this point id is string | undefined so if the id is undefined that can cause problems 
    one way is to use if condition like this*/
  if (id === undefined) {
    throw new Error('id is undefined');
  }

  id; // now this id is string

  /*but we can avoid the if condition by using nullish coalescing operator (??)*/

  const id2 =
    props.params
      .id; /* ?? throw new Error('id is undefined') this is not allowed in in js,ts*/

  //  so to solve that return never comes in handy we can create a raise function to generate an error

  const id3 = props.params.id ?? raise('id is undefined'); // works fine

  id3; // string
};

export {};
