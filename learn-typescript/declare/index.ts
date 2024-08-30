export type DeclareFunction = <T>(arg: T) => T; // for understand this check out ../Learnings/generics-for-func.ts
declare const declareFunction: DeclareFunction;

// we can't define the function body within the same file if we declare a function with const but if use if it let or var we can implement the function body within the same file but personally I don't think that it's a good practice to declare a function with let or var but if we use const for declaring a function we can't implement the function body within same file because it will give the error (Cannot assign to 'declareFunction' because it is a constant)

// In TypeScript, the declare keyword is used to tell the TypeScript compiler that a specific variable, function, class, or module exists, even if it's not defined within the current TypeScript file. It is often used when working with external libraries or when you want to provide type information for code that will be implemented elsewhere, typically in JavaScript. Here's a real-world example of how and why you might use the declare keyword:

// Without using 'declare' keyword
// @ts-expect-error
import _ from 'lodash';

// const result = _.add(5, 10); TypeScript may show an error here (here it is not showing error because we are not actually importing the lodash "just for understanding purpose")

// With 'declare' keyword and type definition
declare const _: {
  add(a: number, b: number): number;
};

const result = _.add(5, 10); // TypeScript understands the type of _.add and doesn't show an error
