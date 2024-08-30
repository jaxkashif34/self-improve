const snailArray = [
  [1,  2,  3,  4,  5,  6],
  [20, 21, 22, 23, 24, 7],
  [19, 32, 33, 34, 25, 8],
  [18, 31, 36, 35, 26, 9],
  [17, 30, 29, 28, 27, 10],
  [16, 15, 14, 13, 12, 11],
];

const snail = (array:number[][]):number[] => {
  const middle = array.slice(1, array.length - 1).map((row) => row.slice(1, row.length - 1));
  return [
    array[0], // first row
    array.slice(1, array.length - 1).map((row) => row[row.length - 1]), // last column (without first and last )
    array.length > 1 ? array[array.length-1].reverse() : [],// bottom row & if more then one items are in main array
    array.slice(1, array.length - 1).reverse().map((row) => row[0]), // first column
    middle.length > 0 ? snail(middle) : [], // pass the middle items and recursion termination condition
  ].flat(); // spread items in single array
};

console.log(snail(snailArray));

// Output : (36) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]