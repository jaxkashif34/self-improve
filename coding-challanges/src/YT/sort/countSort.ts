/* 
Performance of count sort does matter when the range of the elements is not too big or 
when the difference between the max and min is too big
There are two main motive in this algo 
1) Find the count of every distinct element in the array
2) calculate the position of each element in the sorted array

e.g Example array [1, 3, 2, 3, 4, 1, 6, 4, 3]

1) get the max element index sized array
2) store the count of every distinct number on its index like this 
e.g = [0, 2, 1, 3, 2, 0, 1]
now we can see that if there are two 1's in the original array then at 1 index we 
have stored 2 and other are also like same 
basically in that array we are storing the count of each number in the original array

But we want to calculate the count of each element plus the count of element before (## WHY? ##)
Assume that if we sort the original array than on which position 2 will stored completely 
depends on how many number of 1's are in the array

So we have to modify our count array in a way that count of current index + previous index count
that will help us determine on which index (actually index is a actual value of original array
in the count array) the what value will store (value in count array is the index in the original 
array)

and at last we have to traverse through the original array because everything we need is completed
by now (has maps) traverse through last and value will represent the index in the modified array
then we need to decrement the value for 0 based indexing and store the original array element 
in the result array
And at last don't forget to decrement the value of a modified count array (that will help to add 
the same value for lower indexes)
*/

const countSort = (arr: number[]): number[] => {
  const max = Math.max(...arr);

  /*we are adding max + 1 because let's say the max number is 5 and if we pass the 5 
  into new Array(5) if will generate a 4 (which is not enough to store the all the 
  elements count) index array but we want the array which have 5 indexes because 
  and that's a 6 array length
  ## Actually we want an array that can store all the elements count and if we pass
  a number into new Array it will generate the that number length array not that 
  number index array
   */
  const countArray = new Array(max + 1).fill(0);
  const result = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    countArray[arr[i]] += 1;
  }

  for (let i = 1; i < countArray.length; i++) {
    const currentCount = countArray[i - 1] + countArray[i];
    countArray[i] = currentCount;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    let index = countArray[arr[i]];
    /* we are setting the numbers at index - 1 because the the number at a specific index is stored 
    means the how many times the number will repeat in the 1 base order (indexing) but we have to 
    store the numbers in 0 base indexing so for that we are subtracting 1 from the index and then storing
    for example 
    input array = [1, 3, 2, 3, 4, 1, 6, 4, 3]
    count array without modification = [0, 2, 1, 3, 2, 0, 1]
    count array with modification = [0, 2, 3, 6, 8, 8, 9]
    indexes                          0, 1, 2, 3, 4, 5, 6
    so now If we have 2 at 1 index it does not mean we have to store 1 at 2 and then after 
    decrementing at 1 index if we do that then 0 index will remain empty so to fix that we just need
    to decrement 1 before setting into the result array
    */
    result[index - 1] = arr[i];
    countArray[arr[i]] -= 1;
  }

  return result;
};

console.log(countSort([1, 3, 2, 3, 4, 1, 6, 4, 3]));

const countSortConsiderNegative = (arr: number[]): number[] => {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  /* we are finding the max range for the formula for range if 
  Range = max - min
  and then we have to add 1 because we want to include the all 
  elements if we have range=5 then we have to include the 5+1=6
  because max index is always 1 less than the actual array length
  This range ensures we have an array that can cover all values from min to max.
  */
  const range = max - min + 1;

  const countArray = new Array(range).fill(0);
  const result = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    /* we are subtracting the min because if we don't then the index will be negative
    so we have to subtract the min from the current element so that we can get the
    positive correct index we can write the iterations then we can easy make or understand
    the formula of subtracting the min from the current element
    for example
    arr[i] -  min

      -3  -  (-3) = 0
      -2  -  (-3) = 1
      -1  -  (-3) = 2
      0  -  (-3) = 3
      1  -  (-3) = 4
      2  -  (-3) = 5
      now we can easily derive the formula that we have to subtract the min from the
      current element to get the correct index

      here 0 represent -3 index because there is not -ve index in array then we can 
      increment the 0th index in the count array because -3 represent the 0th index
      -3 represent 0
      -2 represent 1
      -1 represent 2
      actual 0 represent 3
    */
    countArray[arr[i] - min] += 1;
  }

  for (let i = 1; i < countArray.length; i++) {
    countArray[i] += countArray[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    /*so if we are strong the occurrence count with subtracting min from current
    then we should also subtract the min from the current element to get the correct
    */
    let index = countArray[arr[i] - min];
    result[index - 1] = arr[i];
    countArray[arr[i] - min] -= 1;
  }

  return result;
};
const arr = [-3, -3, -1, 5, 0, 2, 4, 1];
countSortConsiderNegative(arr); // Output: [-3, -2, -1, 0, 1, 2, 4, 5]
