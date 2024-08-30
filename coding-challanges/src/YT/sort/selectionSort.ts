export {};
/* In this method we first find the minimum element in the array and swap it with the first 
element. Then we find the second minimum element and swap it with the second element and 
so on till the array is sorted.


Selection sort repeatedly selects the smallest element from the unsorted part and moves 
it to the sorted part. Its time complexity is always 𝑂 ( 𝑛^2 ) regardless of the input.
Example: [5, 3, 6, 2, 10]

Best Case Scenario
Time Complexity: O(n^2)

Explanation: Even if the array is already sorted, Selection Sort will still go 
through all elements and perform the same number of comparisons. It doesn't 
take advantage of the order of elements and always performs n(n−1)/2
​comparisons.

Example Input: [1, 2, 3, 4, 5]

Visualization:
First pass: Compare 1 with 2, 3, 4, 5.
Second pass: Compare 2 with 3, 4, 5.
Third pass: Compare 3 with 4, 5.
Fourth pass: Compare 4 with 5.



Worst Case Scenario
Time Complexity: O(n^2)

Explanation: The worst case occurs when the array is sorted in reverse order. 
Selection Sort will still perform the same number of comparisons and 
swaps as in the average case.

Example Input: [5, 4, 3, 2, 1]

Visualization:
First pass: Find the smallest element (1) and swap with the first element (5).
Second pass: Find the next smallest element (2) and swap with the second element (4).
Third pass: Find the next smallest element (3) and swap with the third element (3).
Fourth pass: Find the next smallest element (4) and swap with the fourth element (2).
*/
const arr = [7, 3, 6, 2, 4, 1, 6];
// const arr = [1, 2, 3, 4, 5, 6, 7];
const selectionSort = (arr: number[]) => {
  // we aren't going to the last index because there is not next item in the array to compare
  for (let i = 0; i < arr.length - 1; i++) {
    // we are checking for max index because
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // this condition will only become false when array is already sorted
  }
};

selectionSort(arr);
console.log(arr);
// Learning Reference: https://www.youtube.com/watch?v=dQa4A2Z0_Ro
