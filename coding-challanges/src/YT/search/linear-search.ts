const linearSearch = (array: number[], t: number) => {
  for (let i = 0; i < array.length; i++) {
    if (t === array[i]) return i;
  }
  return -1;
};

console.log(linearSearch([1, 2, 3, 4, 5], 10));
export {};
