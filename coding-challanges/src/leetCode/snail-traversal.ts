export {};
declare global {
  interface Array<T> {
    snail(numRows: number, numCols: number): T[][];
  }
}

// Input:
// numbers = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
// rowsCount = 5
// colsCount = 4

// Output:
// [
//  [19, 17, 16, 15],
//  [10, 1,  14,  4],
//  [3,  2,  12, 20],
//  [7,  5,  18, 11],
//  [9,  8,  6,  13]
// ]

/*
      5 * 0 + 0
      5 * 0 + 1
      5 * 0 + 2
      5 * 0 + 3
      5 * 0 + 4

      5 * 1 + 0
      5 * 1 + 1
      5 * 1 + 2
      5 * 1 + 3
      5 * 1 + 4

      5 * 2 + 0
      5 * 2 + 1
      5 * 2 + 2
      5 * 2 + 3
      5 * 2 + 4

General Understanding: we must have max number (or some kind of general number) in this case (5)
that will be used at first position then next we usually have a nested loops in that kind of 
scenario we just have to take the our index and multiply it then add the inner loop index 
and the inner loop index is responsible for further iterations at max of it termination condition n
I can't explain better because It's just a simple we just have to observer it
*/ 

Array.prototype.snail = function (numRows: number, numCols: number) {
  const thisArray: number[] = this;

  // Check if the total number of elements in the array matches numRows * numCols
  if (numRows * numCols !== thisArray.length) return [];

  // Create a result array of numRows length and fill it with empty arrays
  const result: number[][] = Array(numRows)
    .fill(numRows)
    .map(() => []); // create an array of length 5 and fill it will 5 empty arrays

  // Loop through rows and columns to fill the result array
  for (let col = 0; col < numCols; col++) {
    /* so basically what we are doing is we are start filling the result array like 
    first pick the first column then start filling all the rows (means fill all the 
      first indexes of each row in 1st column "rows[0]") that's why we are columns 
      loop is outside and row loop is inside on each iteration of column we fill all 
      the rows
    */
    for (let row = 0; row < numRows; row++) {
      /* Calculate the index in the original array based on current row and column

      // Determine the target row for the current element based on row's parity
      // as we can seen that from the result 2D array like for odd columns we 
      fill downwards and for even columns we fill to upwards so here we are 
      checking if the column is even or odd and then picking the index based on the column
      */
      const targetRow = (col & 1) === 1 ? numRows - row - 1 : row;

      /*

      (numRows - row - 1) here is how we are gonna calculate which index to fill the value 
      from bottom first as we know that on each iteration of outer loop inner loop runs 5 
      times cuz there are 5 rows so for the first iteration it will fill all the indexes 
      of the first column of each row now here we have to calculate the correct index from 
      bottom of second column 
      so see at 0th iteration of inner loop second times it will start filling from bottom 
        we have 5 total rows so at 0th iteration if we minus current iteration from the total 
        number of rows we will get the current number of that item means we will get 5 when 
        we subtract 0 from 5 we will get 5 which is current position but not current index 
        so in-order to get the index we have to minus -1 to get the current index just like 
        if we have and array of 3 items so we will get the total number in that array by 
        array.length and if we want to get the last index from the array we have to 
        subtract -1 from array.length then we will get the last index
        // here are the iterations 
        5 - 0 - 1 = 4 
        5 - 1 - 1 = 3 
        5 - 2 - 1 = 2 
        5 - 3 - 1 = 1 
        5 - 4 - 1 = 0 

        It is a basic math for example if we have 5 appels in a row if we want to pick second
        last one then we will minus 1 from total we will reach at second last index and the 
        reason we are subtracting -1 because for example if we have a 5 length array then 
        the indexes will be max at 4 indexes are always 1 less then total
      */ 

      // Push the element from the original array to the target row in the result array

      const index = numRows * col + row; // now we have to calculate which index value we should pick from the input array 
      // see i want to add first five elements in the result array then next five and then next five
      // so number of rows are 5 and i also have to fill up the rows so if i multiply total number rows with current column i will get the starting point of that five elements (means 5 x 0 = 0 first column starting point next 5 x 1 = 5 second column starting point) now how do i get the exact position of that index its easy we just need to add current row into it. it will give us the exact position from the input array


      result[targetRow].push(thisArray[index]);
    }
  }

  return result;
};

// Break Big problem into smaller one
// Input Validation:

// Check if the total number of elements in the given array matches the expected total based on numRows and numCols. If not, return an empty array, as the conversion is not possible.
// Initialize Result Array:

// Create a result array with a length of numRows.
// Fill each slot of the result array with an empty array. This array will hold the elements in the desired snail pattern.
// Loop through Rows and Columns:

// Start a nested loop to iterate through rows and columns of the snail pattern.
// The outer loop iterates over the rows of the result array, and the inner loop iterates over the columns.
// Calculate Element Index:

// Calculate the index of the current element in the original one-dimensional array based on the current row and column. This index calculation is done using numRows * row + col.
// Determine Target Row:

// Based on the parity of the current row (odd or even), determine the target row in the result array where the current element should be placed.
// If the row is odd, place the element in the reverse order (snail pattern). Otherwise, place it normally.
// Push Element to Result Array:

// Push the current element from the original array into the appropriate target row of the result array.
// Return Result:

// After both loops have run, the result array will be filled with elements in the snail pattern. Return this array as the final output.
