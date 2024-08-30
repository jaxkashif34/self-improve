export {};
const binarySearch = (array: number[], t: number) => {
  // in binary search we use a technique called divide and conquer
  // we divide the array into two parts and check if the target is in the left or right part
  // if the target is in the left part we discard the right part and vice versa
  // we keep doing this until we find the target or until we have no more elements to search
  // the time complexity of binary search is O(log n) because we are dividing the array in half every time
  // the space complexity is O(1) because we are not using any extra space
  let leftIndex = 0;
  let rightIndex = array.length - 1;

  while (leftIndex <= rightIndex) {
    const middleIndex = Math.floor((rightIndex + leftIndex) / 2);
    if (t === array[middleIndex]) {
      return middleIndex;
    }
    if (t < array[middleIndex]) {
      rightIndex = middleIndex - 1;
    } else {
      leftIndex = middleIndex + 1;
    }
  }
  return -1;
};

binarySearch([-5, 2, 4, 6, 10], 10);

const recursiveBinarySearch = (array: number[], t: number) => {
  return search(array, t, 0, array.length - 1);
};

const search = (array: number[], t: number, leftIndex: number, rightIndex: number): number => {
  if (leftIndex > rightIndex) {
    // same as while loop condition there when loops on leftIndex <= rightIndex loops end here is same like when leftIndex > rightIndex recursion ends and returns -1
    return -1;
  }
  const middle = Math.floor((leftIndex + rightIndex) / 2);
  if (t === array[middle]) {
    return middle;
  }

  if (t < array[middle]) {
    return search(array, t, leftIndex, middle - 1);
  } else {
    return search(array, t, middle + 1, rightIndex);
  }
};

console.log(recursiveBinarySearch([-5, 2, 4, 6, 10], -20));
