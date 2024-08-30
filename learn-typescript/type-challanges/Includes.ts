type T = <G>(x: G) => G;
// Question: can you tell me what is the return type of T ?
// Answer: T is a function that takes no argument and return a generic type
// Question: can you tell me what is the return type of T<number> ?
// Answer: T<number> is a function that takes no argument and return a number type
// Question: I never heard of that type of T because I'm new in typescript can you explain me a little more about it?
// Answer: yes, T is a generic type that takes a generic type as an argument and return that generic type
// Question: is there any other way we can define generics for functions ?
// Answer: yes, we can define generics for functions by using interface
// Question: can you show me how we can define generics for functions by using interface ?
// Answer: yes, I can show you
// example
// interface GenericInterfaceForFunction<T> {
//   (x: T): T;
// }

// interface InterfaceForGenericFunction {
//   <T>(x: T): T;
// }

const opu: T = <G>(x: G) => {
  return x;
};

declare const t: T;
// can you explain me above line of code ?
// yes, t is a function that takes a generic type as an argument and return that generic type
// Question: why we need to add <G> after T ?
// Answer: because we need to tell typescript that T is a generic type
// Question: why we are using declare here and where ?
// Answer: because we are not defining the type of t here we are just telling typescript that t is a function that takes a generic type as an argument and return that generic type
// Question: why we use declare ? in which cases we use declare ?
// Answer: we use declare when we are not defining the type of something we are just telling typescript that this thing is of this type
// Question: can you show me an example of declare ?
// Answer: yes, I can show you
// example
declare const z: number;
// can you explain me above line of code ?

type TU<T, U> = <G>() => G extends T ? 1 : 2;
// Question: can you tell me what this code is doing ?

type IsEqual<X, Y> = 
    (<T>() => T extends X ? 1 : 2) extends 
    (<T>() => T extends Y ? 1 : 2) ? true : false;

	type Includes<T extends readonly unknown[], U> =
	T extends [infer First, ...infer Rest]
	  ? IsEqual<First, U> extends true ? true : Includes<Rest, U>
	  : false;

type MyInclude = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>

// Question: can you tell me what this code is doing ?
// Answer: this code is checking if X and Y are equal or not
// Question: can you tell me what this code is doing in real deep because i have no idea what this code is doing ?
// Answer: yes, I can tell you  but first you have to understand this code
// Answer: <T>() => T extends X ? 1 : 2
// Answer: this code is a function that takes no argument and return a number type
// Answer: <T>() => T extends Y ? 1 : 2
// Answer: this code is a function that takes no argument and return a number type
// Answer: (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
// Answer: this code is checking if the return type of first function is equal to the return type of second function
// Answer: if the return type of first function is equal to the return type of second function then it will return true otherwise it will return false
// Question: what is infer ?
// Answer: infer is a keyword that is used to infer the type of a generic type
// Question: can you tell me what this code is doing ?
// Answer: this code is checking if the first element of the array is equal to the Item or not
// Question: can you explain me about ...infer ?
// Answer: yes, I can explain you
// Answer: ...infer is a keyword that is used to infer the type of a generic type


