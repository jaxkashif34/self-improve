// Exporting an empty object to adhere to module syntax in case of future exports.
export {}

// Initial array containing both numbers and nested arrays
const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

// The goal is to flatten the array up to a certain depth.
// Example: If `n = 0`, no flattening is performed. If `n = 1`,
// the first level of nested arrays is flattened.
// Expected output for n = 1: [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

// `flat` is the main function to flatten the array based on depth `n`
const flat = (array: any[], n: number) => {
  // Initialize an empty array to store the flattened result
  const result: any[] = [];

  // Recursive helper function to flatten arrays up to depth `n`
  const flatDeep = (array: any[], depth: number) => {
    // Loop through each element of the current array
    array.forEach((item) => {
      // If the current item is an array AND the current depth > 0, recurse into it
      if (Array.isArray(item) && depth > 0) {
        // Call flatDeep recursively, reducing the depth by 1
        flatDeep(item, depth - 1);
      } else {
        // If the item is not an array or depth is 0, push it to the result
        result.push(item);
      }
    });
  };

  // Initial call to `flatDeep` to begin flattening the input array
  flatDeep(array, n);

  // Return the final flattened result
  return result;
};

// Test case to flatten the array with depth `n = 1`
// This should flatten only the first level of nesting
console.log(flat(arr, 1));
// Expected output: [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
