const printToFile = (text: string, callback: () => void): void => {
  //   console.log(text);
  //   callback();
};
printToFile('Hello, world!', () => console.log('Callback!'));

type MutationFunction = (v: number) => number;

const arrayMutate = (numbers: number[], mutate: MutationFunction): number[] => {
  return numbers.map(mutate);
};

const numbers = arrayMutate([1, 2, 3, 4, 5], (number) => {
  return number * 2;
});

// console.log(numbers);

export const Adder = (num: number): ((v: number) => number) => {
  return (num2: number) => {
    return num2 + num;
  };
};
