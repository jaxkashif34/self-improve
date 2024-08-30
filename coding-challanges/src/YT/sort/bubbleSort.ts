// Time Complexity : O(n^2) - worst case
// Space Complexity : O(1)

/*
Bubble sort repeatedly swaps adjacent elements if they are in the wrong order. 
It is very inefficient for large lists and has a time complexity of O(n^2 ). 

## Best Case (Already Sorted Array): 𝑂 ( 𝑛 ) Example: [1, 2, 3, 4, 5] 
## Worst Case (Reversed Array): 𝑂 ( 𝑛^2 ) Example: [5, 4, 3, 2, 1]

Best Case Scenario 
Time Complexity: 𝑂 ( 𝑛 )
Explanation: The best case occurs when the array is already sorted. In this case, 
Bubble Sort only needs one pass through the array to confirm that no swaps are needed.

Example Input: [1, 2, 3, 4, 5]

Steps:
Compare 1 with 2, no swap needed.
Compare 2 with 3, no swap needed.
Continue similarly for the rest of the array.

Worst Case Scenario 
Time Complexity: 𝑂 ( 𝑛 2 )

Explanation: The worst case occurs when the array is sorted in reverse order. 
Bubble Sort will need to perform the maximum number of comparisons and swaps.

Example Input: [5, 4, 3, 2, 1]

Steps:
Compare 5 with 4, swap them.
Compare 5 with 3, swap them.
Continue similarly for the rest of the array.
*/
const bubbleSort = (array: number[]) => {
  let swapped = false;
  do {
    // If the loop ran until array.length, on the last iteration, array[i + 1] would be array[array.length],
    // which is out of bounds and would result in undefined. This would then cause a comparison of a number with undefined
    // which is not meaningful and could lead to incorrect results or errors.
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        // const temp = array[i];
        // array[i] = array[i + 1];
        // array[i + 1] = temp;
        [array[i], array[i + 1]] = [array[i + 1], array[i]]; // responsible for swapping (same as above)
        swapped = true;
      }
    }
  } while (swapped);
};

// basically we are comparing two elements and if the first one is bigger than the second one we swap them
// we do this until we don't have to swap any more elements
// we are using a do while loop because we want to run the loop at least once
// we are using a swapped variable to check if we swapped any elements in the last iteration swapped only becomes true if we swapped elements and enter in if statement
// if we didn't swap any elements that means that the array is sorted and we can stop the loop

const array = [6, 20, 8, 2, 4];
bubbleSort(array);
console.log(array);
