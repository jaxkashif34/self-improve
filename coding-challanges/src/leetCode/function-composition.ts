const compose = (...fns: ((x: number) => number)[]) => {
  return (x: number) => {
    return fns.reduceRight((acc, current) => {
      return current(acc);
    }, x);
  };
};

const double = (x: number) => x * 2;
const square = (x: number) => x * x;

// function composition
const output_final = compose(square, double, double)(2);
console.log(output_final);
