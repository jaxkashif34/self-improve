type A2<T> = (param: T) => T;
type B = <T>(param: T) => T;
// by combining them
type C<T> = <T>(param: T) => T;

// @ts-expect-error
declare const a: A2; // Error: Generic type 'A' requires 1 type argument(s).
declare const aNum: A2<number>;
declare const aStr: A2<string>;
declare const cFnc: C<number> // in this case we must have to pass a generic

declare const b: B;
// @ts-expect-error
declare const bIsNotGeneric: B<number>; // Error:Type 'B' is not generic.

const numToNum: A2<number> = (x: number) => {
  return x + 10;
};
const strToStr: A2<string> = (x: string) => {
  return x + 'string';
};
type Obj = {
  name: string;
  age: number;
};

const data: Obj = {
  name: 'Kashif',
  age: 22,
};

const objToObj = (data: Obj): Obj => data;
const objToObj2: A2<Obj> = (data: Obj): Obj => data;

const objData = objToObj(data);
const objData2 = objToObj2(data);

const identity: B = <T>(x: T) => {
  return x;
};

const result: Obj = identity(data);

interface GenericInterfaceForFunction<T> {
  (x: T): T;
}

interface InterfaceForGenericFunction {
  <T>(x: T): T;
}

const ouput: GenericInterfaceForFunction<Obj> = (data: Obj) => {
  return data;
};
const ouput2: InterfaceForGenericFunction = <Obj>(data: Obj) => {
  return data;
};

export {};
