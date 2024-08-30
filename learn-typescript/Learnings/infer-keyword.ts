type Result = true extends boolean ? 'yes' : 'no'; // 'yes'

type Result1 = boolean extends true ? 'yes' : 'no'; // '

const func = (check: boolean) => {
  return '1234';
};

type TypeOfFunc = typeof func; // (check: boolean) => string

//   type FuncResult = ReturnType<TypeOfFunc>;
type Result2 = typeof func extends (...args: any[]) => any ? 1 : 0;

const str = `hello_world-friend`.replace(/(_|-)/g, (item) => {
  return `${item}${item}${item}`;
});
console.log(str);

type OnlyStringReturnType<T> = T extends (...args: any[]) => infer R ? (R extends string ? R : never) : never;

type ResultType = OnlyStringReturnType<typeof func>; // if func returns string value then ResultType is string
type ResultType2 = OnlyStringReturnType<() => 'one' | 'two'>; // "one" | "two"
type ResultType3 = OnlyStringReturnType<() => Promise<string>>; // never
//   cleaner syntax
type OnlyStringReturnTypeCleaner<T> = T extends ((...args: any[]) => infer R extends string) ? R : never;

type ResultType4 = OnlyStringReturnTypeCleaner<typeof func>;

type OnlyStringReturnTypeMoreNest<T> = T extends (...args: any[]) => infer R ? (R extends Promise<infer U> ? (U extends Array<infer S> ? (S extends string ? S : never) : never) : never) : never;

type ResultType5 = OnlyStringReturnTypeMoreNest<() => Promise<Array<'1' | '2'>>>; // "1" | "2"

type Multiplier<T> = T extends `${infer U extends number}x` ? U : never;

type M = Multiplier<'2.0x' | '3x' | '4x'>; // if we pass "2.0x" this will only return number

type NYAreaCode = 934 | 680 | 332 | 838;

type CodeValidator<T> = T extends `${infer P1 extends NYAreaCode}-${infer P2 extends number}-${infer P3 extends number}` ? true : false;

type Phone = CodeValidator<'838-123-123'>; // true when number starts with any of number within NYAreaCode

type InferSomething<T> = T extends infer U ? U : never;
type Inferred = InferSomething<"I'm a string">;
// U will be "I'm a string" infer is a keyword that is used to infer (andaza legana) the type of a generic type

// example 2

type InferSomething2<T> = T extends { a: infer U; b: number } ? U : never;
type Inferred2 = InferSomething2<{ a: 'Hello'; b: 2 }>; // Inferred2 will be "Hello"

export {};
