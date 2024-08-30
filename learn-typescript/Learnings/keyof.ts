type Point = { x: number; y: number };
type P = keyof Point; //    ^ = type P = "x" | "y"
type P1 = keyof Point[]; // ^ = type P1 = "length" | "toString" | "pop" | "push" | "concat" | ...
type P2 = keyof { [x: string]: Point }; // ^ = type P2 = string | number
// there is bug in type P2 we only said that the type of future keys should be string but the actual result is both string and number that's not what we want so to restrict this we have to use In-built Record<> type
type P2WithoutBug = keyof Record<string, Point>; // ^ = type P2WithoutBug = string

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
export {};