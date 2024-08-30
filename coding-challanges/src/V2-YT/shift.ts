// Shift
const myShift = (array: number[]) => {
  if (array.length === 0) return undefined;
  const firstItem = array[0];
  for (let i = 0; i < array.length - 1; i++) {
    array[i] = array[i + 1]; // assigning the next index value to the current index value
  }
  array.length--;
  return firstItem;
};
