// helpful for understanding : https://www.youtube.com/watch?v=Y0lT9Fck7qI
// check how many number of ways we can reach to the top (5 in this case) of the staircase if we can take 1 or 2 steps at a time
// Graph of this algo can be found on PDF (page 53)
const climbingStaircase = (n: number) => { // O(n)
  // it is same like fibonacci series
  const result = [1, 2];
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  /* we are returning n-1 because let's take an example of 5 steps, so in this case loop 
  only runs 3 times because there is already 2 values are in the array so if it runs 3 
  times the total 5 values are in the array so at 4th index we will get the value
  */
  return result[n - 1];
};

climbingStaircase(5);

const climbingStaircaseRecursion = (n: number): number => { // O(2^n)
  // basically we are taking 1 or 2 steps at a time and when n becomes either 1 or 2 we return 1 or 2 respectively
  // these are the base cases (leaf nodes) so if we add them we will get the total number of ways
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbingStaircaseRecursion(n - 1) + climbingStaircaseRecursion(n - 2);
};

climbingStaircaseRecursion(5);
