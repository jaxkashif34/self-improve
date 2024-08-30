function addNumbers(a: number, b: number): number {
  return a + b;
}

const addString = (str1: string, str2: string = ''): string => {
  return `${str1} ${str2}}`;
};

const format = (title: string, param: string | number): string => `${title} ${param}`;

// A function that returns nothing has a return type of void
const printFormat = (title: string, param: string | number): void => console.log(format(title, param));

// how we can return promise that can resolve into string
const fetchData = (url: string): Promise<string> => Promise.resolve(`Data from ${url}`);

// how we can give types to the rest operator
const introduce = (salutation: string, ...names: string[]) => `${salutation} ${names.join(' ')}`;

// Q: when types are enforce with typescript
// Ans: Typescript only enforce types at compile-time not run-time 
const getName = (user: { first: string; last: string }): string => {
  return `${user.first} ${user.last}`;
};

export { addNumbers, addString, format, printFormat, fetchData, introduce , getName};
