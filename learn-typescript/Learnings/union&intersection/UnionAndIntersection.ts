// Detailed Explanation: https://www.youtube.com/watch?v=EsoRUqFutYU&t=12s
type HasName = { name: string };
type HasAge = { age: number };

type HasNameOrAge = HasName | HasAge;

const a: HasNameOrAge = { name: 'John' };
const b: HasNameOrAge = { age: 23 };

const c: HasNameOrAge = { name: 'John', age: 23 };
// we are getting both (name and age) as we have used union type HasName | HasAge as far as i know we should only get one value either name or age the reason is that in typescript unions are not worked as they work in maths so in typescript when we take a union (|) of two types we can assign either values of one type or values of another type or all values of both types it accepts large number of values
// and when we take the intersection of two types we can only assign values of all of them and we can't assign either values of one type or values of another type it accepts much smaller set of values
// for more explanation see the images in same folder


export {};
