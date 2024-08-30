type Spaces = ' ';
type TrimLeft<S extends string> = S extends `${Spaces}${infer R}` ? TrimLeft<R> : S;

type TimedLeft = TrimLeft<'    Hello World  '>; // expected to be 'Hello World  '
// we are checking if the first character is a space or not. If it is a space, then we need to remove it and it will only remove one space in one iteration in-order to remove all the whitespace at left we need recursion.
