function assert<T extends true>(expectTrue: T extends never ? false : true): void {
  console.log({ expectTrue });
}
function assert2<T extends true>(expectTrue: T extends true ? true : false): void {
  console.log(expectTrue);
}

type IsNullAbleType<T> = T extends null | undefined ? true : false;

const func = () => {};

type A = IsNullAbleType<typeof func>;
// @ts-expect-error
assert<A>(true); // this gives an error because in the function definition generic `T` extends to `true` and IsNullAbleType is `false` so that's why it gives an error. (same case for lower function invoke)
//   or
// @ts-expect-error
assert<A>(false);

//   So given this:
// @ts-expect-error
assert<IsNullAbleType<string>>(false); // false 

type IsNonNullableType<T> = IsNullAbleType<T> extends never ? true : never;

type C =  IsNonNullableType<string>
// @ts-expect-error
assert<C>(true); // no compile error, works fine

//   How Exclude works in TypeScript

// type Exclude<T, U> = T extends U ? never : T;
type ResultType = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;

/*
       'a' extends 'a' | 'b' ? never : 'a'; => never
       'b' extends 'a' | 'b' ? never : 'b'; => never
       'c' extends 'a' | 'b' ? never : 'c'; => 'c'
  */

type MyType<T> = T extends string | number ? T : never;
type MyResultType = MyType<string | number | boolean>; // Result : string | number
//   My type is distributive because the type T is being checked as it is its not wrapped into any other type like a Tuple or an Array. mean each union type is checked separately to the after extends part (string | number).
//   now if i create another type and make it non-distributive by wrapping it into a function like this:
type MyNonDistributiveType<T> = (() => T) extends () => string | number ? T : never;
type MyNonDistributiveResultType = MyNonDistributiveType<string | number | boolean>; // Result : never
//   here is how it checks the type:
//   (() => string | number | boolean) extends () => string | number ? string | number | boolean : never;
// the function which returns `string | number | boolean` is not assignable to the function which returns `string | number` so it returns `never` type.
//   and we can also make it non-distributive by wrapping it into an array like this:
type MyNonDistributiveType2<T> = [T] extends [string | number] ? T : never;
type MyNonDistributiveResultType2 = MyNonDistributiveType2<string | number | boolean>; // Result : never
//   here is how it checks the type:
//   [string | number | boolean] extends [string | number] ? string | number | boolean : never;
// the array which contains `string | number | boolean` is not assignable to the array which contains `string | number` so it returns `never` type.

type AUnion = string | number | never | boolean; // Result : string | number | boolean

(() => {
  function assert<T extends true>(expectTrue: T extends never ? false : true) {}

  type IsNullableType<T> = T extends null | undefined ? true : never;
  type A = IsNullableType<string>;
  // @ts-expect-error
  assert<A>(false); // this return false because typescript treat never as an empty union so we need to tell typescript that never is not an empty union by wrapping it into an array like this:
  function assert2<T extends true>(expectTrue: [T] extends [never] ? false : true) {}

  //  we tell TypeScript NOT to look at never as an empty union? Well, we can force TypeScript to evaluate T before trying to distribute it. This means we need to mutate the T type in the conditional so the never value of T gets captured and isn't lost. We do this because we can't distribute over an empty union (read never) type for T. We can mutate T by wrapping it in an array. This forces TypeScript to evaluate T before distributing it. This is what it looks like:
  type IsNullableType2<T> = [T] extends [null | undefined] ? true : never;

  type IsNonNullableType<T> = IsNullableType<T> extends never ? true : never;
  assert<IsNonNullableType<string>>(true);
})();

export {};
