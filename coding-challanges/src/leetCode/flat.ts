export {}
const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
// const n = 0;
// const output = [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15];

const flat = (array: any[], n: number) => {
  const result: any[] = [];
  const flatDeep = (array: any[], n: number) => {
    array.forEach((item) => {
      if (Array.isArray(item) && n > 0) {
        flatDeep(item, n - 1);
      } else {
        result.push(item);
      }
    });
  };
  flatDeep(array, n);
  return result;
};

console.log(flat(arr, 1));
