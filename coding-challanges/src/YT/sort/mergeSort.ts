/*Best Case Scenario 
Time Complexity: 𝑂 ( 𝑛 log ⁡ 𝑛 )
Explanation: The best case for Merge Sort is the same as the average and worst case 
because it always divides the array into halves and merges them. The process of 
merging takes linear time, while the array division process takes logarithmic time, 
resulting in 𝑂(𝑛 log 𝑛)complexity.

Worst Case Scenario 
Time Complexity: 𝑂 ( 𝑛 log ⁡ 𝑛 )

Explanation: Merge Sort has a worst-case time complexity of (n log n) because it 
always divides the array into two equal halves and merges them. The number of 
comparisons and merges remains consistent regardless of the initial order of elements.
*/

const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left: number[], right: number[]) => {
  const sortedArr: number[] = []; // temp arr
  while (left.length >= 1 && right.length >= 1) {
    if (left[0] < right[0]) sortedArr.push(left.shift()!);
    else sortedArr.push(right.shift()!);
  }
  return [...sortedArr, ...left, ...right]; // only sortedArr order will matter
  //  the return result of merge will also be the return result of mergeSort function of previous calls and last call will be the final result
};

/*  First we are dividing the array into 2 halves, then we are recursively calling mergeSort 
on both the left and right halves until we reach to the one element array or empty array 
then pass that one element array or empty array to the merge function then merge function 
starts a loop for condition either left or right array have more than or equal to 1 element 
then inside loop we compare the first element of left to the the first element of right 
array if it is smaller then push the first element of left array into new temporary array 
else push from right array then spread them all into one array in a specific order and return 
it and that return array will become the input value of merge parameter.
*/

// then new one element array passed to the merge function (right function) and do the same process and return the sorted array and that sorted array will become the input value of merge right parameter.

const arr = [-2, 20, 8, -6, 4];
console.log(mergeSort(arr));
// Detailed Explanation
// https://www.youtube.com/watch?v=qInXNtKaf4Q&list=PLC3y8-rFHvwjPxNAKvZpdnsr41E0fCMMP&index=26

// Without using shift method
const mergeSortWithoutShift = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

const mergeWithOutShift = (left: number[], right: number[]): number[] => {
  const sortedArr: number[] = []; // temp arr
  let leftP = 0;
  let rightP = 0;
  while (leftP < left.length && rightP < right.length) {
    if (left[leftP] < right[rightP]) {
      sortedArr.push(left[leftP]);
      leftP++;
    } else {
      sortedArr.push(right[rightP]);
      rightP++;
    }
  }

  while (leftP < left.length) {
    sortedArr.push(left[leftP]);
    leftP++;
  }
  while (rightP < right.length) {
    sortedArr.push(right[rightP]);
    rightP++;
  }
  return sortedArr;
};

console.log(mergeSortWithoutShift(arr));

export {};
