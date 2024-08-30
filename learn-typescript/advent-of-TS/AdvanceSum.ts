/* Problem: get the first digit and the last digit and  and create a two digit number 
by concatenating them. once you get the two digit number from each string, add them 
together and return the sum.
*/
type Args = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

type FirstNumber<T extends string> =
  T extends `${infer F extends number}${infer _}` // checking if the first character is a number it is return that number
    ? F // returning that number
    : T extends `${infer _}${infer R}` /* otherwise its means first character isn't a number so in that case 
    we are chopping that first number and passing the rest of string again so that i can be see again 
    in first condition*/
    ? FirstNumber<R>
    : never;

/* so now we will need to get the last number from the string best way is first reverse the string and 
then get the fist number with (FirstNumber)*/

type Reverse<T extends string> = T extends `${infer F}${infer Rest}`
  ? `${Reverse<Rest>}${F}`
  : T;

// `${FirstNumber<"1ab3d">}${FirstNumber<Reverse<"1ab6d">>}`  // "16"(type string) (test)

// now the problem is that the two digit number is actually a string so need a way to convert it into number

type ToNumber<T extends string> = T extends `${infer N extends number}`
  ? N
  : never;

// type X =  ToNumber<`${FirstNumber<"1ab3d">}${FirstNumber<Reverse<"1ab6d">>}`>  // 16 (type number) (test)

// (testing)
/* type Actual<T extends string[]> = {
  [K in keyof T]: ToNumber<`${FirstNumber<T[K]>}${FirstNumber<Reverse<T[K]>>}`>;
};

Actual<Args> // number[] */

/* so far we are getting the number array what we want now we need to figure it out how to add them
one way come in mind is that generate an array of number length then spread all of these arrays into 
final array to get the total count so for that i need to create a type that can convert the given 
number into that number length array
*/

// take a number and create an array of that number length
type OfLength<T extends number, A extends any[] = []> = A extends {
  length: T /* here we are not just checking that if A is an object that have length property 
  we are also checking that if that length value matches the provided number*/;
}
  ? A // returning the array of provided number length
  : OfLength<T, [...A, any]>; // we are incrementing the array length by 1 and calling the function again

// now we need to spread each of the array into final-sum-array and simply return the length of that array
// in order to get the length of an array we also need to create another type that return the length of an final-add-array

type Length<T extends any[]> = T extends { length: infer T extends number }
  ? T
  : never;

type Add<T extends number, S extends number> = Length<
  [...OfLength<T>, ...OfLength<S>]
>;

//
type Sum<T extends number[], Acc extends number = 0> = T extends [
  infer F extends number,
  ...infer R
]
  ? R extends number[]
    ? Sum<R, Add<Acc, F>>
    : Add<Acc, F>
  : Acc;

type Solution<T extends string[]> = Sum<{
  [K in keyof T]: ToNumber<`${FirstNumber<T[K]>}${FirstNumber<Reverse<T[K]>>}`>;
}>;

type DisplayResult = Solution<Args> // 142

export {};
