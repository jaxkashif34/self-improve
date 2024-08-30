type FormResponse =
  | {
      id: string;
      type: 'checkbox';
      value: boolean;
    }
  | {
      id: string;
      type: 'text';
      value: string;
    };

type MyOmit<T, K extends keyof T> = T extends T ? Omit<T, K> : never; // we are doing this cuz we want to trigger distributive conditional behavior
type RenderFormResponse = MyOmit<FormResponse, 'id'>; // expected behavior

type AAS = Omit<FormResponse, 'id'>; // unexpected behavior

declare const f: RenderFormResponse;

if (f.type === 'checkbox') {
  /* as you can see that when type is checkbox value will be boolean and when type is text value will be string but if we use Built-in Omit Utility Type (with omitting id) it does omit the id but it will combine the values of both type and value and create something like this which is not we want we want that when we select type checkbox in if block the value should be boolean and in else block the value should be string because this is what we set in FormResponse if we want to combine them we can combine them in FormResponse but we don't want that 
  {
    type: "checkbox" | "text";
    value: string | boolean;
  }
*/
  f.value; // boolean
} else {
  f.value; // string
}

type ASimpleUnion = 'checkbox' | undefined | 'text' | number;

// we want array of either one of them not array of either one of them or all of them
// want this ["checkbox"] or ["text"] or [23] or [undefined]
// don't want this ("checkbox" | number | "text" | undefined)[] same as ["checkbox", 23, "text", undefined] number is missing

type A1 =
  Array<ASimpleUnion>; /* equivalent to Array<"checkbox" | number | "text" | undefined> same as ("checkbox" | number | "text" | undefined)[]  equivalent to (array of either one of them or all of them) */

// same as
type A2 = Array<string | number>; // (string | number)[]

const a1Type: A1 = ['checkbox', 'text', undefined, 12]; // number is missing
const a6Type: A6 = ['checkbox' /*"text", undefined, 12 */];
// the difference b/w them is in front of you in A1 type which is without triggering distributive behavior we can use multiple values in array but we can only use single value in A6 type (what we want)


const a1Example: A1 = ['checkbox', 'checkbox', 'text', 12 /* false */]; // we can't use boolean here because we don't have boolean in ASimpleUnion means array of either one of them or all of them as you can see that we don't have undefined in array but it still works

// but what if we want to create a type that is an array of either one of them not all of them ("checkbox"[] | number[] | "text"[] | undefined[])

// we can do this by using distributive conditional type
type A3 = Array<'checkbox'> | Array<number> | Array<'text'> | Array<undefined>; // we want to create like this then we need to use distributive conditional type

type ASimpleUnion2 = 'kashif' | 'shair';

type A4 = ASimpleUnion extends string ? ASimpleUnion : never; // this will return never because not all element in a ASimpleUnion is a string we are not distributing we are still treating it as a single unit and when we use generic with conditional (extends) then we are basically doing much like iterating means taking a single element at a time

// const a4Type: A4 = "shair";

// however things changed when we combine a generic and a conditional type like this: this is what i'm talking above in A4 type comment
type OnlyString<T> = T extends string ? T : never; // this will return string because we are distributing the type T
type A5 = OnlyString<ASimpleUnion>; // this will return only string because we are distributing the type ASimpleUnion A4 still return never because we are not distributing the type in A4
// basically we are filter out that was't a string
// we treated each of the element in ASimpleUnion individually in A5

// let's combe back to the original example instead of creating an array that could be anyone of the array e.g. ASimpleUnion[] we want to create a union of each type wrapped in an array e.g. string[] number[]

// we need to combine the both the conditional type and generic type but here is a catch what would be the condition
// so actually we don't need a condition we are just triggering the distributive behavior of the type

type ToArray<T> = T extends T ? Array<T> : never;

// Adding this line later we have to pass a union in the generic parameters we should not do it like pass the type Object and then get the keys of that object in this way it will not work.

// ******like this (will not trigger distributive behavior)****
type C = { name: string; age: number };

type A<T> = T extends T ? Array<keyof T> : never; // here we are making union of keys of T generic
type B = A<C>;

type A6 = ToArray<ASimpleUnion>; // 🎇😵 here it works
// A6 type means that array of only one of them ("checkbox" | number | "text" | undefined)

// now let's make the our first example works

// what if we don't want to trigger the distribution but while still using these complex mechanics
// we can do this by wrapping the both sides of an extends in tuple [T] extends [T]

type ToArrayWithOutDistribution<T> = [T] extends [T] ? Array<T> : never;

type A7 = ToArrayWithOutDistribution<ASimpleUnion>; // this will return Array<ASimpleUnion> because we are not triggering the distribution

// Again learning Conditional types

function someFunction<T>(value: T) {
  const someOtherFunction = (someArg: T extends boolean ? 'TYPE A' : 'TYPE B') => {
    // someArg can either be "TYPE A" or "TYPE B" cuz at that moment ts don't know what will be the value of someArg so we can write like this
    // so if we provide the type of variable a we must have to provide both types "TYPE A" and "TYPE B" cuz a can be any of them
    const a: 'TYPE A' | 'TYPE B' = someArg;
  };
  return someOtherFunction;
}

// at this point ts don't know about anything about the type of T generic cuz we have not called the someFunction when we call someFunction with argument then ts will know about the type generic T

const result = someFunction(false); // see when we call someFunction with arguments then ts know what the value of generic T and according to it ts will select the right value either "TYPE A" or "TYPE B"

type AUnion = string | number | never;
// never is used to filter the unions
// and never is not included in AUnion type

// Exclude works on unions and Omit works on objects

type Exclude<T, U> = T extends U ? never : T;
// Question : as we know that Exclude works on unions so we provide first a set of unions like ("A"|"B"|"C"|"D") as T and the other one which we want to exclude is let's say "C"|"B" so the question is that on the right side of type (T extends U ? never : T) how do we know that weather we need to put T on left side of extend or right side of extends same as for U how we know that
// Answer : the answer is that see basically we are much like iterating in conditionals like above we have to put that type to left side which have more unions means the main union type from which we want to remove here i'm not just talking about the Exclude i'm talking in general wherever we use extends

/*
here is how it works 

// it will compare the each element of a Union Type T which is on left side with the whole Union type of which is on right side of extends
"A" extends "C"|"B" ? never : "A" => "A"
"B" extends "C"|"B" ? never : "B" => never
"C" extends "C"|"B" ? never : "C" => never
"D" extends "C"|"B" ? never : "D" => "D"
*/

type MyType<T> = T extends string | number ? T : never;
// so in MyType string | number | boolean will be checked individual value rather then as a single whole value because it is a distributive conditional and we will get string | number in MyResult and boolean will become never
// type T is begin checked as it is. it is not wrapped into any other type like tuple, array or a function
type MyResult = MyType<string | number | boolean>;

// let's see another example (types wrapped inside a function)

type MyType2<T> = (() => T) extends () => string | number ? T : never; // now here it is behaving non-distributive here it is taking string | number as single whole value instead of taking separate one
type MyResult2 = MyType2<string | number>;

// another way to make it non-distributive is to wrap inside in a array

type MyType3<T> = [T] extends [string | number] ? T : never; // here is is become non-distributive and taking the input as whole single unit that's why it returns never but the same type with above MyType returns (string | number) even if we provide (string | number | boolean)
type MyResult3 = MyType2<string | number | boolean>;

// Infer keyword

type InferSomething<T> = T extends infer U ? U : any;
// infer is used to infer (andaza legana) what will be the value of T
type Inferred = InferSomething<"I'm a string">;

// let's see another example

type InferSomething2<T> = T extends { a: infer A; b: number } ? A : any;
// we are adding a constraint that the only object is suitable is an object with two properties a and b. The b property should be number and basically we are extracting the whatever the value of a property "a" and return it
type Inferred2 = InferSomething2<{ a: 'Hello'; b: 23 }>; // if we don't provide b property it will not work

// we can also do this

type InferSomething3<T> = T extends { a: infer A; b: infer B } ? A & B : any;
// we are adding a constraint that the only object is suitable is an object with two properties a and b. The b property should be number and basically we are extracting the whatever the value of a property "a" and return it
type Inferred3 = InferSomething3<{ a: { someA: 1 }; b: { someB: 'c' } }>; // if we don't provide b property it will not work
export {};
