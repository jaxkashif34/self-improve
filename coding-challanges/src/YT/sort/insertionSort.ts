/*
Insertion sort is very useful when we are constantly adding new elements into an array while 
maintaining the ascending order 
Pattern: I noticed the pattern in that while loop is we are just comparing the current number
with the jth-index number if it's (jth-index number) is bigger then move the that (jth-index number)
to the next

Insertion sort builds the sorted array one element at a time by repeatedly inserting the next 
element into the correct position. It is efficient for small lists or nearly sorted lists. 
Best Case (Already Sorted Array): 𝑂 ( 𝑛 ) Example: [1, 2, 3, 4, 5] 
Worst Case (Reversed Array): 𝑂 ( 𝑛^2 ) Example: [5, 4, 3, 2, 1]


Best Case Scenario 
Time Complexity: 𝑂 ( 𝑛 )

Explanation: The best case occurs when the array is already sorted. In this case, 
Insertion Sort only makes 𝑛 − 1 comparisons and no swaps, resulting in linear time 
complexity.

Example Input: [1, 2, 3, 4, 5]

Steps:
Compare 2 with 1, already in correct position.
Compare 3 with 2, already in correct position.
Continue similarly for the rest of the array.

Worst Case Scenario 
Time Complexity: 𝑂 ( 𝑛^2 )

Explanation: The worst case occurs when the array is sorted in reverse order. 
In this case, Insertion Sort will need to make the maximum number of comparisons 
and swaps.

Example Input: [5, 4, 3, 2, 1]

Steps:
Move 4 before 5, resulting in one swap.
Move 3 before 4 and 5, resulting in two swaps.
Continue similarly for the rest of the array.
*/ 
const insertionSort = (arr: number[]) => {
  for (let i = 1; i < arr.length; i++) {
    let numberToInsert = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > numberToInsert) {
      arr[j + 1] = arr[j];
      /* we are decreasing the value of j by 1 so that we can compare the numberToInsert 
      with the previous element (right to left) of the array. so that we can loop through 
      the sorted part (remaining sorted part) of the array
      */
      j = j - 1; 
    }
    /* we are swapping elements in sorted part based on the condition if the jth element 
    (sorted array item) (from the right to left) is greater than the numberToInsert then 
    we will make the next number from the jth element equal to the jth number and we will 
    keep doing that until we find the jth element lesser then the numberToInsert if we 
    find jth element lesser than numberToInsert we will insert it at [j + 1] index next 
    to the jth element and if reach at j = 0 on j = 0 j will become -1 and -1 will terminate
     the loop and we will insert the numberToInsert at the 0th index of the array
    */
    arr[j + 1] = numberToInsert;
  }
};

const arr = [-2, 20, 8, -6, 4];
insertionSort(arr);
console.log(arr);
// Detailed Explanation
// https://www.youtube.com/watch?v=OxUF23k7IcM&list=PLC3y8-rFHvwjPxNAKvZpdnsr41E0fCMMP&index=24

// 1. First we will take the first element of the array and we will assume that it is sorted.
// 2. Then we will take the second element of the array and we will compare it with the first element of the array, if the second element is smaller than the first element then we will swap them.
// 3. Now we will take the third element of the array and we will compare it with the second element of the array, if the third element is smaller than the second element then we will swap them, and then we will compare the third element with the first element of the array, if the third element is smaller than the first element then we will swap them.
// 4. Now we will take the fourth element of the array and we will compare it with the third element of the array, if the fourth element is smaller than the third element then we will swap them, and then we will compare the fourth element with the second element of the array, if the fourth element is smaller than the second element then we will swap them, and then we will compare the fourth element with the first element of the array, if the fourth element is smaller than the first element then we will swap them.
export {}