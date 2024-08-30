/*
Explanation: https://www.youtube.com/watch?v=QXum8HQd_l4
########## When we said quick sort a pivot should comes to our mind ##########
pivot is simple one of the item in the array that simply meets the 3 conditions 
in the final array after we sorted it 
1) Correct Position in final, sorted array
2) items to the left are smaller
3) items to the right are larger
Quick sort idea
Identify the pivot element in the array
• Pick first element as pivot
• O Pick last element as pivot
• Pick a random element as pivot
• Pick median as pivot
Put everything that's smaller than the pivot into a 'left' array and everything that's greater than
the pivot into a 'right' array
Repeat the process for the individual 'left' and 'right' arrays till you have an array of length 1
which is sorted by definition
Repeatedly concatenate the left array, pivot and right array till one element is left in the 
array  (which is sorted by definition) or an empty array (in case no element push into either 
left of right array the other array will be empty)


// Time complexity

************ Best Case ************
Time Complexity: 𝑂 ( 𝑛 log ⁡ 𝑛 )
Scenario: This occurs when the pivot chosen always divides the array into two nearly equal 
halves. With each partitioning step, the problem size is reduced significantly, leading 
to a balanced recursion tree.

## Example:
Array: [8, 3, 1, 7, 0, 10, 2]

One way to achieve this is to consistently choose a pivot that divides the array 
roughly in half. For instance, if the pivot selection method is the "median of three" 
or a similar strategy that finds a good middle value, the array gets divided effectively.

For simplicity, let's assume our pivot selection method is perfect:

Initial array: [8, 3, 1, 7, 0, 10, 2]
Choose 7 as pivot (median value here).
The array gets partitioned into [3, 1, 0, 2] and [8, 10].
This continues with similar balanced partitions in each recursive call.

************ Worst Case ************
Time Complexity: 𝑂 ( 𝑛^2 ) 
Scenario: This happens when the pivot chosen is always the smallest or largest element, 
leading to highly unbalanced partitions. For instance, if the array is already sorted or 
reverse-sorted and the pivot is the first or last element, each partition results in one 
subarray with 𝑛 − 1 n−1 elements and another with 0 elements, leading to 𝑛 n levels of 
recursion.

## Example: Array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] (sorted array) 
If we always choose the last element as the pivot: 
Initial array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
Choose 10 as pivot. 
The array gets partitioned into [1, 2, 3, 4, 5, 6, 7, 8, 9] and []. 
This process repeats with the next largest element, leading to a series of highly 
unbalanced partitions.
*/
const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;
  const middleIndex = Math.floor(arr.length / 2);
  const pivot = arr[middleIndex];
  /*if we pick the middle one then we must have to exit the loop when we encounter the same indexed number again*/
  const left: number[] = [];
  const right: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === middleIndex) continue;
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return quickSort(left).concat(pivot, quickSort(right));
};

const arr = [-2, 20, 8, -6, 4];
console.log(quickSort(arr));

export {};
