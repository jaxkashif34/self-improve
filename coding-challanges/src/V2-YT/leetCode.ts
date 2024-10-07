export {};

// valid parentheses

const isValidParentheses = (s: string): boolean => {
  const stack = [];
  const map: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(map[s[i]]); // it will push the closing bracket into stack for later comparison in else if block
    } else if (s[i] !== stack.pop()) {
      return false;
    }
  }

  return stack.length === 0;
  /* this is just for extra checking otherwise we can directly return true 
  if for loop completed and same closing bracket will pop out it means that 
  input is valid and if it isn't valid it will return false in else if block*/
};

isValidParentheses("([]){}"); // true

// longest common prefix

const longestCommonPrefix = (strings: string[]): string => {
  let prefix = "";

  if (!strings.length) return prefix;

  for (let i = 0; i < strings[0].length; i++) {
    /* it is running the loop first word length times cuz we are finding the longest
     prefix so the possible case is to match all the character of first word or any 
     word it does not matter which character we are picking for a loop cuz the in 
     worst case the entire word will match with all the remaining words in the list (array)
    */

    /* first it will select the first letter of the first string the it will compare 
    it with all the first letters of all the strings in the array if it matches it 
    will add it to the prefix variable at the end of the loop and if it doesn't it 
    will immediately return the prefix variable
    */

    const char = strings[0][i];

    for (let j = 1; j < strings.length; j++) {
      if (strings[j][i] !== char) return prefix; // it will return out of the function no matter how much nested loop is there
    }

    prefix += char;
  }

  return prefix;
};

longestCommonPrefix(["flower", "flow", "flight"]); // fl

// combine two array and sort them without using sort method

/* for that kind of cases we usually first merge the two arrays and 
then sort it with any sorting algorithm*/
const sort = (arr1: number[], arr2: number[]) => {
  // sort without using sort method
  const arr = [...arr1, ...arr2];
  const result = [];
  while (arr.length) {
    const min = Math.min(...arr);
    result.push(min);
    arr.splice(arr.indexOf(min), 1); // shortening the array by removing the min value
  }
  return result;
};

sort([1, 4, 7, 3], [2, 5, 6, 9]);

// remove duplicates from sorted array
// Time Complexity : O(n^2)
// Space Complexity : O(1)
const removeDuplicates = (array: number[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        array.splice(array.indexOf(array[i]), 1);
      }
    }
  }
};

removeDuplicates([1, 2, 4, 5, 2]);

// Time Complexity : O(n)
// Space Complexity : O(n)
const removeDuplicatesWithHas = (array: number[]) => {
  const hash: Record<number, number> = {};
  for (let i = 0; i < array.length; i++) {
    if (!hash[array[i]]) {
      hash[array[i]] = 1;
    } else {
      array.splice(array.indexOf(array[i]), 1);
    }
  }
  return array;
};

removeDuplicatesWithHas([1, 2, 4, 5, 2]);

// find duplicates from the array without taking extra space and linear time complexity
// Time Complexity : O(n)
// Space Complexity : O(1)
// Explanation : https://youtu.be/ACYunkWQnSI?t=292
const findDuplicates = (array: number[]) => {
  /* 1 <= array[i] <= n (n is number of integers in array) we have to solve this question
   using liner Time Complexity and constant Space Complexity we will use input array as hash-map
   so according to the above equation each integer in an array must be 
   1 <= array[i] <= array.length so we will use that condition in our advantage
   so when we start loop the first value is 4 if the value is 4 it's means that there must 
   be at least 0, 1, 2, 3 indexes are present in the input array because according to 
   the condition integers must be equal or lesser then array.length so if we found an 
   integer wan can safely say that there must be found-integer - 1 indexes are present 
   (  like for simplicity if we found the 4 and we can assume that 4 is the highest value
      in the array according to the condition each value in array can't be greater then 
      it's length so if we assume that 4 is the highest value in array then it's means 
      that we must have at least an array of containing 3 indexes
    )
   so we will mark found-integer - 1 index as visited by making it -ve value
   then if we make -ve to found-integer - 1 index we can say that we found that index once
   means if 4 - 1 = 3 (mark 3 index value -ve ) then i can say that i found the 4 at once
   and later if i again come to mark 3rd index it's means that i must found the integer 4 again
   and then 4 will be added in the result array
  */
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const index = Math.abs(array[i]) - 1;
    if (array[index] < 0) {
      // check for duplicates numbers
      result.push(Math.abs(array[i]));
    } else {
      array[index] = -array[index]; // both lines are same
      // array[index] *= -1;
    }
  }
  return result;
};

findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]);

// find the missing number from the array

// for Understanding :https://www.youtube.com/watch?v=s_unH3o-PvM
// detail explanation can be found on PDF (page 14)
// Time = O(n)
// Space = O(1)
const findMissingNumber = (array: number[]) => {
  // in this technique we may face integer overflow problem
  // (Gauss's Method for Summing)
  const n = array.length + 1; // 7 (adding 1 because one number is missing in the array)
  // Note: This formula gives the sum of all numbers from 1 to 𝑛 n inclusive.
  const sum = (n * (n + 1)) / 2; // 28
  // let's take an example 1,2,3,4,5,6
  // S = 1,2,3,4,5,6  ---> eq-1
  // S = 6,5,4,3,2,1  ---> eq-2

  // add both the equations

  // 2S = 7,7,7,7,7,7 (notice that answer of each pair become n + 1) whereas n is the number of integers
  // so can you tell me how many (n + 1)(7) we have ?
  // we have n(6) number of n + 1(7)
  // so we can write the equation like this
  // 2S = n * (n + 1)
  // we want only S not 2S so we can divide by 2 on both side and equation become
  // S = (n * (n + 1)) / 2
  /* by this formula we are calculating the sum of all the elements of an array if no number 
  is missing then calculate the sum of array elements but in the calculation the number is 
  missing so when we subtract array sum from the actual sum (if no number is missing) we 
  get the value of missing number
  */
  const arraySum = array.reduce((acc, curr) => acc + curr, 0); // 21
  return sum - arraySum; // 28 - 21 = 7
};

findMissingNumber([1, 2, 3, 4, 5, 6]);
// Video Reference : https://www.youtube.com/watch?v=6KHW7ZQwtCA
// find missing number by using hashing
// Time Complexity = O(n)
// Space Complexity = O(n)
const findMissingNumberByHashing = (array: number[]) => {
  // range from 1 < arr[i] > n
  const hash: Record<string, number> = {};
  for (let i = 0; i < array.length; i++) {
    /* in this method we are using hashing to find the missing number in 
    first loop we are adding all the numbers as keys in hash object and 
    assigning a value of 1 (so that we have a record of available numbers in the array)
    */
    hash[array[i]] = 1;
  }
  for (let i = 1; i < array.length + 1; i++) {
    /* in this loop we are starting from 1 because we add numbers in hash object
     from first element of an array and ending loop at n + 1 because 1 number is 
     missing that's why we are adding 1 into n and check if number is present in 
     hash object if it isn't present in the hash object return that number
    */
    /* we are starting from 1 index cuz according to the condition input range is 
    1 <= array[i] <= n so we know that there must be a 1 value in the input array 
    if it isn't that one is the missing number
    */
    if (!hash[i])
      return i; /* we are checking if a key of 1 is present if it is 
    false the condition and run the second iteration if key of 2 is present if 
    it's not return that index*/
  }
  return null; // if we can't find the missing number
};

findMissingNumberByHashing([1, 3, 4, 5, 6]);

// finding missing number by XOR
// Time Complexity = O(n)
// Space Complexity = O(1)
const findMissingNumberByXOR = (array: number[]) => {
  /* in this method what we will gonna do is first we take the XOR of all 
  the integers in the array then we take the XOR of n + 1 (adding 1 cuz 1 
    number is missing) then at the end we take the XOR of both results 
    this will give us the missing number
  */
  let x1 = array[0]; // starting from first element in the loop we will start from second index
  let x2 = 1; // 1
  /* we are calculating the XOR of all the numbers from 1 to n + 1 so we have to 
  start from 1 that's why we are initializing x2 with 1
  */
  for (let i = 1; i < array.length; i++) {
    // in this loop we are calculating the XOR of all the elements of the array
    x1 = x1 ^ array[i]; // 1 ^ 3 ^ 4 ^ 5 ^ 6 = 3
  }
  for (let i = 2; i <= array.length + 1; i++) {
    /* in this loop we are calculating the XOR of all the numbers from 1 to n + 1
    see we are taking xor of i with the array.length indexes so if we see that we are 
    starting from 1 index of array to counter that we are adding + 1 and running the
    loop until very last index and also including that last index 
    basically we have to loop through N + 1 times 
    */
    x2 = x2 ^ i; // 1 ^ 2 ^ 3 ^ 4 ^ 5 ^ 6 = 1
  }
  return x1 ^ x2; // 3 ^ 1 = 2
};

// XOR Truth Table
// 0 ^ 0 = 0
// 0 ^ 1 = 1
// 1 ^ 0 = 1
// 1 ^ 1 = 0

// 1       3   4   5   6
// ^   ^   ^   ^   ^   ^
// 1   2   3   4   5   6

// 1 ^ 1 = 0  ----> 1 ^ 1 = 0
// 0 ^ 2 = 2  ----> 0 ^ 2 = 2
// 3 ^ 3 = 0  ----> 11 ^ 11 = 0
// 4 ^ 4 = 0  ----> 100 ^ 100 = 0
// 5 ^ 5 = 0  ----> 101 ^ 101 = 0
// 6 ^ 6 = 0  ----> 110 ^ 110 = 0

findMissingNumberByXOR([1, 3, 4, 5, 6]);

// Two Sum Problem
// Time Complexity = O(n)
// Space Complexity = O(n)
// we have to return the indexes if we add the value of them generate target
// Explanation : https://youtu.be/KLlXCFG5TnA?t=235
const twoSum = (array: number[], target: number) => {
  // here is how we are solving this problem
  // since the algo is pretty simple but let's understand how it works (understand the maths behind it)
  // 9 - 2 = 7 (now we have to take values from one side and put them on other side according to math rules)
  // 9 = 7 + 2 (2 will come at right side)
  // so if we take 7 to the left side it will be equal to the 2
  // 9 - 7 = 2
  // now let's explain it in the context of algo
  /* so we can see that the result of 9 - 2 is 7 we will store 2 in hash table 
  (we are storing 2 because if any other elements get subtracted from 9 (target)
   generates output of 2 (if 2 is in hash table) it's means that we have found 
   the pair of two number which sums is equal to 9)
  */
  const hash: Record<string, number> = {};
  for (let i = 0; i < array.length; i++) {
    const num = target - array[i];
    if (hash[num]) {
      return [hash[num], i];
    } else {
      hash[array[i]] = i;
    }
  }
};

twoSum([2, 7, 11, 15], 9);

// Time Complexity = O(n^2)
// Space Complexity = O(1)

const twoSumBruteForce = (array: number[], target: number) => {
  // is it possible to store -ve value inside the object as a key ?
  for (let i = 0; i < array.length; i++) {
    const num = target - array[i]; // if the num is 2 then now we have to find the 7 in the remaining array so that's why we are starting loop from next index to i
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] === num) {
        return [i, j];
      }
    }
  }
};

twoSumBruteForce([2, 7, 11, 15], 9);

// ladder length problem
// Available in PDF (page 17)
/* 
Graph representation

               ----- dot ---- dog ----- 
               |      |        |       | 
hit ---- hot --       |        |        ---- cog
               |      |        |       |
               ----- lot ----- log -----


it is a graph problem so we can make the adjacencyList of it
{
  hit: ['hot'],
  hot: ['hit', 'dot', 'lot'],
  dot: ['dog', 'hot'],
  dog: ['dot', 'cog'],
  lot: ['log', 'hot'],
  log: ['lot', 'cog'],
  cog: ['dog', 'log'],
}
*/
const ladderLength = (
  beginWord: string,
  endWord: string,
  wordList: string[]
): number => {
  const queue = [beginWord];
  const visited = new Set<string>();
  let level = 0;
  while (queue.length) {
    // this loop is responsible for level order traversal
    const size = queue.length; // size basically tell us how many possible paths are from previously pushed word
    /* we are incrementing the level here cuz if we do that after the for loop then when we 
    find the destination word then it immediately returns the current level so that's why 
    it returns the 1 level less then actual level*/
    level++;
    for (let i = 0; i < size; i++) {
      /* we are looping through the size of the queue because we don't want to increment 
      the the level even for the same adjacent path mean if a word can be transformed into 
      two paths it's mean i have two same paths for a single word and we have to loop 
      through the both of them then increment the level
      */
      /* we don't want that like if two same paths for single word and increment on each 
      path so for avoiding this scenario we use this loop after loop finished then increment 
      the path*/
      /* (e.g) : for hot it can be (dot and lot) we don't want to increment level for both 
      of them (dot and lot)*/
      const word = queue.shift()!;
      if (word === endWord) return level;
      for (let i = 0; i < wordList.length; i++) {
        /* this loop is responsible for checking if the word that is popped from the queue 
        is adjacent to any word in the wordList if it is adjacent then push that word into 
        the queue and mark it as visited
        SIMPLE WORDS: it checks how many possible paths are from most recent shifted() word like
        if it matches two words then those two will pushed into queue if not visited before or 
        are adjacent
        */
        const wordListItem = wordList[i];
        const isVisited = !visited.has(wordListItem);
        const isAdjacentTrue = isAdjacent(word, wordListItem);
        if (isVisited && isAdjacentTrue) {
          /* if it is not visited and it is adjacent to the current word of wordList then 
          push it into the queue and mark it as visited*/
          queue.push(wordListItem);
          visited.add(wordListItem);
        }
      }
    }
  }
  return 0;
};

const isAdjacent = (word1: string, word2: string): boolean => {
  /* this function is responsible for checking if the word is adjacent to the current 
  word of wordList by counting the number of different characters if the count is greater 
  than 1 then return false otherwise if equal to one return true
  */
  let count = 0;
  for (let i = 0; i < word1.length; i++) {
    // we can loop through on any word since they have same length
    if (word1[i] !== word2[i]) count++;
    if (count > 1) return false;
  }
  return count === 1;
};

ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]);

// Find Peek Element Problem
// (with sentinel values)
const findPeekElement = (array: number[]) => {
  array.unshift(-Infinity); // same as array[-1] = -Infinity
  array.push(-Infinity); // same as array[array.length] = -Infinity
  /* new array [-Infinity, 3, 2, 1, -Infinity] */
  for (let i = 1; i < array.length - 1; i++) {
    /*we are starting from 1 because we add -Infinity at start so we can't consider it and
    we are only looping till the second last element because we add the -Infinity at end 
    and it also doesn't consider */
    if (array[i - 1] < array[i] && array[i] > array[i + 1]) {
      return i - 1;
      /* by returning i -1 we are not actually returning -Infinity we 
      just return the index of original array (without Infinities) element index 
      because look in the original array 3 is at 0 index*/
    }
  }
};

findPeekElement([1, 2, 3]); // 0 (index)

// Find Peek Element (Linear Time Complexity)
// Time Complexity = O(n)

const findPeekElementLinerTC = (array: number[]) => {
  let isPreviousSmaller = true;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1] && isPreviousSmaller) {
      /* at this line we are constantly checking if the next number from the current 
      number is greater then the current number and also checking if the previous number 
      is smaller or not by this condition we sure that current number is the peek element
      */
      return i;
    }
    // we are preparing isPreviousSmaller variable for next iteration element
    isPreviousSmaller = array[i] < array[i + 1];
    /* we re-assign the value of isPreviousSmaller on each iteration we make sure that
     the previous number is smaller than the current number basically we assign the 
     value of isPreviousSmaller in previous iteration so that we can use the value of 
     isPreviousSmaller in next iteration and in first iteration the value of isPreviousSmaller 
     is true because for the very first index there is not previous number and we can assume
     that the previous is smaller
     if it's the first iteration (0) of loop then we set the isPreviousSmaller 
     (either true of false ) for the second index (1)
    */
  }
  return array.length - 1;
  /* this line of code only runs if the elements in the array are stored in ascending 
  the above condition fails every time because each current number is not greater 
  than the next number so loop will end than we know that the last item is greater 
  among all of the elements
  */
};

findPeekElementLinerTC([1, 4, 3, 4]);

// Find Peek Element (Binary Search Technique)
// Time Complexity = O(log n)
const findPeekElementByBinarySearch = (array: number[]) => {
  /* in this BS Technique what we are doing is we are comparing the middle element with 
  the next element if the middle element is smaller than the right element it means that 
  the peek element is on the right side of the array and if the middle element is greater 
  than the right element it means that the peek element is on the left side of the array

  By binary search technique we are checking if the right element is greater then middle 
  element or not if it is then then move the low pointer to the right side at next element 
  to the mid cuz if middle is not greater then next it's mean that next element might be a 
  peak element so we set low to that element index and if it is not greater then it's means 
  that move the upper pointer to the left side
   */
  let low = 0;
  let upper = array.length - 1;

  while (low < upper) {
    /* our goal is to make upper and low equal and which element is bigger assign the 
    index of that element to low or upper variable based on the condition
    */
    const mid = Math.floor((low + upper) / 2);

    if (array[mid] < array[mid + 1]) {
      low = mid + 1; // we are assign the index of mid + 1 because that element is bigger than the mid element
    } else {
      // if next element is smaller than the mid element the make upper equal to the mid element
      upper = mid; // here we assigned the mid only because mid element is bigger than the next element
    }
  }
  return low;
};

findPeekElementByBinarySearch([3, 2, 4, 1]);

// Two Sum Problem Part 2 (Sorted Array)
const twoSum_Pt2 = (array: number[], target: number) => {
  // let's understand it with an example
  // let's say we have an array [-1, 0, 2, 4, 6, 10] and target is 8
  // we will take two pointers one at the start and one at the end
  /* let's say that we add first number and last number of an array the sum of these 
  two numbers is (-1) + 10 = 9 so we can see that the answer 9 > target we can conclude 
  that if we add the smallest number of an array to the last number answer is greater than 
  the target number if that's the case we can say that right side elements of first 
  element will also generate an output greater than target (because the array is sorted) 
  so we can move the upper pointer left side and excluding last element
  
  so in the next iteration we again sum the first and last element -(1) + 6 = 5 so we can 
  see that 5 < target this conclude that if we add first element with the last element 
  (which is the greater than all th elements) results is lesser than the target so if it's 
  produce result lesser than target it's mean that if we add a first element and any 
  other element it will produce result lesser than target because we already see that by add -1 
  and highest number in array can't even produce the result equal or greater that the target so 
  we can safely exclude the -1 from the array and increase the lower pointer to one step ahead

  by continuously doing the we can definitely find two elements that sums is equal to target if 
  these elements is existed in the array
  */
  let lower = 0;
  let upper = array.length - 1;

  while (lower < upper) {
    let sum = array[lower] + array[upper];
    if (sum < target) {
      lower += 1;
    } else if (sum > target) {
      upper -= 1;
    } else {
      return [lower + 1, upper + 1];
      /* in both above cases if sum is not greater or lesser then target it means that sum is equal to the target
      adding 1 to the lower and upper because in question it is said that index starts from 1
      */
    }
  }
};

twoSum_Pt2([-1, 0, 2, 4, 6, 10], 8);

// Three Sum Problem (this is brute force approach)
// Time Complexity = O(n^3)
// Space Complexity = O(1)
const threeSumBF = (array: number[]) => {
  const result: number[][] = [];
  // [-1, 0, 1, 2, -1, -4] take this as an example
  /* we are using this sort method because without sorting the array may contains 
  duplicates elements which cause twice triplets but order is different because 
  they create a pair with different duplicate element so what we want is to first 
  sort the array than by sorting duplicates items comes together then we can use 
  a condition in which we compare the element and it's next element if it's same 
  then skip that iteration in this way we can avoid twice triplets
   */
  array.sort((a, b) => a - b);
  for (let i = 0; i < array.length; i++) {
    if (i > 0 && array[i] === array[i - 1]) continue;

    for (let j = i + 1; j < array.length; j++) {
      if (j > i + 1 && array[j] === array[j - 1]) continue;

      for (let k = j + 1; k < array.length; k++) {
        if (k > j + 1 && array[k] === array[k - 1]) continue;

        if (array[i] + array[j] + array[k] === 0) {
          result.push([array[i], array[j], array[k]]);
        }
      }
    }
  }
  return result;
};

threeSumBF([-1, 0, 1, 2, -1, -4]);

// same Three Sum Problem with Optimized Solution
// Time Complexity = O(n^2)
// Space Complexity = O(1)
const threeSumOptimized = (array: number[]) => {
  array.sort((a, b) => a - b);
  /* we are using this sort method because without sorting the array contains duplicates 
  elements which cause twice triplets but order is different because they create a pair 
  with different duplicate element so what we want is to first sort the array than by 
  sorting duplicates items comes together then we can use a condition in the first loop 
  in which we compare the element and it's next element if it's same then skip that iteration
  basically what we are doing is take the first element and find the pair of that element 
  in the rest of the array and if we found the pair of that element we will push that 
  triplet into the result array
  and what we are doing in else block is we are skipping the duplicate elements because 
  if we don't skip the duplicate elements we will get the same triplet twice and incrementing 
  the lower and decrementing the upper pointer because we already found the pair of that 
  element so we don't need to check that element again
  */
  const result = [];

  for (let i = 0; i < array.length; i++) {
    /* in the outer most loop if we pick a number then it's means that we are fixing array[i] 
    but we are free to use array[j] and array[k] let's see with an example
    the problem is to pick 3 number who's sum is 0
    array[i] + array[j] + array[k] = 0
    so if we are fixing the ith index then we just only need to find the jth and kth index so 
    we can write like this
    array[j] + array[k] = 0 - array[i]
    this means that now we have to find the pair of array[j] + array[k] that's sum is equal to 
    (0 - array[i])
    now we have to pick jth and kth index if you see carefully 3-sum problem converted into 
    2-sum problem
    */
    if (i > 0 && array[i] === array[i - 1]) continue;
    const target = 0 - array[i];
    /* we are picking i + 1 cuz we never want to use the same number twice and this is same 
    we did before in Brute Force algo in second loop (start second loop from next element to i)
    */
    let lower = i + 1;
    let upper = array.length - 1;

    while (lower < upper) {
      const sum = array[lower] + array[upper];
      if (sum < target) {
        lower += 1;
      } else if (sum > target) {
        upper -= 1;
      } else {
        /* let's say we have an array [4, 0, 0, 1, 3, -4, -4]
        now let's say we found a triplet at index 0, 1 and 5
        we want to make sure we skip all the duplicates so in 
        order skip all the duplicates since we don't know how 
        many duplicates are there so will use while loop to skip 
        all the duplicates
        */
        result.push([array[i], array[lower], array[upper]]);
        while (array[lower] === array[lower + 1]) lower += 1; // if we found the duplicate left to right move the lower pointer to one step right
        while (array[upper] === array[upper - 1]) upper -= 1; // if we found the duplicate right to left move the lower pointer to one step left
        lower += 1; // we are incrementing and decrementing here cuz now we found the one triplet so move on and find other ones
        upper -= 1;
      }
    }
  }
  return result;
};

threeSumOptimized([-1, 0, 1, 2, 2, -1, -4]);

// Subset Problem (DFS)
//  2 ^ N (leaf nodes)
//  2 *  2 ^ N - 1 (nodes in total)
// Time Complexity : 2 *  2 ^ N - 1 (at least)
// Time Complexity : 2 *  2 ^ N - 1 + 2^N (subsets)
// Time Complexity : 2 *  2 ^ N - 1 + N * (2^N) (subset array can have at least N number of elements)
// Time Complexity : 2 ^ N + N * (2^N) (getting rid of constants terms)
// Time Complexity : O(N * (2^N)) ("2 ^ N" is smaller than "N * (2^N)" so ends with bigger value)
// Space Complexity : N * (2^N) + N (recursion also take some space so N is for it but it's much smaller)
// Space Complexity : O(N * (2^N))
// you can find the explanation of this problem in PDF page (21)
// for better understanding watch the tree on PDF and compare it with how the code is executing

/*
           []
          /  \
        []    [1]
       /  \   /  \
     []   [2] [1] [1, 2]
*/
const subsetWithDFS = (array: number[]) => {
  /* traversing the tree from the left side
  at 0 index we will push [] and for index 1 we will push [1] (first level) and for index 2 
  we will push [1, 2] and [2] (second level) and for index 3 we will push [1, 2, 3] and then 
  we backtrack to [1, 2] and push [1, 3] and then we backtrack to [1] and push [2, 3] and then 
  we backtrack to [] and push [3] (third level)
  it become much more clear if you watch the tree on PDF page (21)
  */
  const result: number[][] = [];
  const dfs = (index: number, current: number[]) => {
    result.push(current);
    for (let i = index; i < array.length; i++) {
      dfs(i + 1, [...current, array[i]]);
      /* index will keep track of the level in the tree if index is at 2 its means that we are 
      at second level and if index is 3 it means that we are at leaf node
      we are passing i + 1 because we don't want to repeat the same element again and again so 
      we are passing i + 1 so that we can skip the same element and move to the next element
      let's say if we are at index 0 and we are passing 0 + 1 = 1 so we are skipping the 0 
      index and move to the next index
      passing index is just like a base condition for recursion let's say if we didn't pass 
      index it will loop three times (length of an array) and on each iteration we call the 
      same dfs which will create another dfs function execution context and starts again the 
      loop which will run three times again and cycle continues
      by passing index we are avoiding this scenario because when we pass index 0 at start we 
      start at 0 we are traversing the root node in a tree and then we pass i + 1 which will 
      traverse the left node of tree
      here is how it will push functions into call stack first it will run the loop for the 3 
      times and on first iteration it holds the remaining 2 iterations and call the dfs function 
      which is in first iteration with the values of 1 (index) and [1] (current) then it will go 
      deep into it until reaches at leaf node at leaf node its values are 3 (index) and [1,2,3] 
      here loops ends and then we start backtracking and traverse the remaining nodes of a tree
      */
    }
  };
  dfs(0, []);
  return result;
};

subsetWithDFS([1, 2, 3]);

// subset with DFS (part 2)

const subsetWithDFS_pt2 = (
  array: number[],
  depth = 0,
  subset: number[] = [],
  results: number[][] = []
) => {
  /* this is easy to understand and what we are doing here is traversing the tree starting 
  from right side when we reach at end then push it into the results array otherwise just 
  increase depth and pass the remaining data as it is
  */
  if (depth === array.length) {
    results.push(subset);
  } else {
    /* here we have two scenario either we can add the current element or we can't so 
    that's why we are using two recursions */
    subsetWithDFS_pt2(array, depth + 1, subset, results);
    // in it we are passing new subset along with increasing depth
    subsetWithDFS_pt2(array, depth + 1, [...subset, array[depth]], results);
  }
  return results;
};

subsetWithDFS_pt2([1, 2, 3]);

// subset with (Binary Solution)

const subsetWithBinarySolution = (array: number[]) => {
  /* this solution is pretty simple to implement
  we just need to convert 0 to 7 into binary string (cuz we have 3 elements in an 
    array so if we take 3 elements in a set it will be 2 ^ 3 = 8) then we just need 
    to check each conversion how many 1's are in each binary converted string at 
    which index we found 1 we just need to push that index element into the subset 
    array then after checking conversion subset array will push into result array
  (e.g)
  input = [1, 2, 3]
  so if we chose 1 and 2 from the input we mark them as 1's (by converting into binary) 
  and 3 as 0 like so 110 and then chose that elements from the input array whose are marked as 1's
  [1, 2, 3]
   1  1  0 -----> [1, 2]
  ------------------
  [1, 2, 3]
   1  1  1 -----> [1, 2, 3]
  ------------------
  [1, 2, 3]
   0  0  0 -----> [0, 0, 0] // didn't chose any cuz there is no 1's in the binary string
  */

  const subsetCount = Math.pow(2, array.length); // we are calculating how my times we have to iterate 2 ^ N
  // means how many sets we have to create
  const results = [];

  for (let i = 0; i < subsetCount; i++) {
    /* converting index from 1 to 8 into binary and adding an extra zeros so that the 
    total digits in string become 3 we want 3 digit string because later we need to 
    check how many 1's and at which positions are in a string
    */
    const strV = i.toString(2); // 0, 1, 10, 11, 100, 101, 110, 111
    const binaryString = strV.padStart(array.length, "0"); // 000, 001, 010, 011, 100, 101, 110, 111
    const subset = [];
    // 000,
    // 001,
    // 010,
    // 011,
    // 100,
    // 101,
    // 110,
    // 111
    // we can clearly see that each of them are unique

    for (let j = 0; j < binaryString.length; j++) {
      /* we are checking how many 1's are in a string on each 1 we are just pushing 
      the element at that index into the subset array and when this loop end we will 
      push that subset array into result array
      */
      if (binaryString[j] === "1") {
        subset.push(array[j]);
      }
    }

    results.push(subset);
  }
  return results;
};

subsetWithBinarySolution([1, 2, 3]);

// subSet with BFS

const subsetWithBFS = (array: number[]) => {
  // this implementation is pretty much similar to the DFS solution
  const result = [];
  const queue: [number[], number][] = [];
  queue.push([[], 0]);
  while (queue.length > 0) {
    const [current, index] = queue.shift()!;
    result.push(current);
    for (let i = index; i < array.length; i++) {
      queue.push([[...current, array[i]], i + 1]);
    }
  }
  return result;
};
console.log(subsetWithBFS([1, 2, 3]));

const subsetWithBFSWithOutShift = (array: number[]) => {
  // this implementation is pretty much similar to the DFS solution
  const result = [];
  const queue: [number[], number][] = [];
  queue.push([[], 0]);
  let queueP = 0;
  while (queue.length > queueP) {
    const [current, index] = queue[queueP];
    queueP += 1;
    result.push(current);
    for (let i = index; i < array.length; i++) {
      queue.push([[...current, array[i]], i + 1]);
    }
  }
  return result;
};

// Longest unique Substring (With Brute Force Approach)
// Time Complexity = O(n^3)
// Space Complexity = O(n)
const longestSubstring = (s: string) => {
  let max = 0;
  for (let begin = 0; begin < s.length; begin++) {
    // we are checking every possible substring like first a, ab, abc, abcd, b, bc, bcd
    for (let end = begin; end < s.length; end++) {
      // it's the same thing we can start the inner loop from begin + 1 and if we do like so then we have to add only end in the substring method instead of end + 1
      let subString = s.substring(begin, end + 1); // end + 1 character is excluded when picking the string
      if (isUnique(subString)) {
        max = Math.max(max, subString.length);
      }
    }
  }
  return max;
};

longestSubstring("ab0c0ed");

const isUnique = (s: string): boolean => {
  // we are storing the characters in the set and if we found the duplicate character we return false otherwise return true
  const set = new Set();
  for (let i = 0; i < s.length; i++) {
    if (set.has(s[i])) return false;
    set.add(s[i]);
  }
  return true;
};

// Optimal Solution of Longest substring (Sliding Window Technique)
// Time Complexity = O(n)
// Space Complexity = O(n)
// can be found on PDF (page 22-24)
const longestSubstringOptimal = (s: string) => {
  /* in this algo what we are doing is we are using sliding window technique and we
   are using two pointers begin and end and we are moving the end pointer through 
   the index of alphabets of string and storing them into the Set() when we found 
   the duplicate character we start deleting the previous stored alphabets in Set() 
   from start of the string until we delete that duplicate character (note that we 
    are not moving forward in deleting process we are still on same alphabet "0" in 
    this case) once we delete the duplicate character then we start moving the end 
    pointer (meaning start moving through the alphabets) and add them into the Set() 
    and when we complete traversing the string we then count the alphabets in the 
    string and that will be the max long string without duplicate characters
  */
  let max = 0;
  let begin = 0;
  let end = 0;
  const set = new Set();
  while (end < s.length) {
    if (!set.has(s[end])) {
      set.add(s[end]);
      end++;
      /* we are choosing the maximum number b/w max and set.size cuz let's say the duplicate
      number is at last (ab0c0) and according to the code we are reducing the set.size so if the 
      duplicate number is at last then we will delete all the previous alphabets and the 
      no remaining letters are left then in that case our previously count max will save
      us and return the previously counted alphabets
      */
      max = Math.max(max, set.size);
    } else {
      set.delete(s[begin]);
      begin++;
    }
  }
  return max;
};

longestSubstringOptimal("ab0c0ed");

const longestSubstringOptimal2 = (s: string) => {
  /* in this method we are doing the same like what we are doing in upper method of name 
  (longestSubstringOptimal) but the only difference is that when we found the duplicate 
  alphabet instead of start deleting all the previous alphabets from start we just 
  increment the begin pointer to the next index of the previous found character of 
  that alphabet and update the value (index) of that alphabet in the map
  we are just keep incrementing the max variable until we found the duplicate character
  */
  let max = 0;
  let begin = 0;
  const map: Record<string, number> = {};
  for (let end = 0; end < s.length; end++) {
    if (map[s[end]] !== undefined && map[s[end]] >= begin) {
      /* this condition (map[s[end]] >= begin) matters because when we pass "abba", 
      without condition it give us 3 instead of 2. basically we don't want to set 
      the begin pointer after the same duplicate previous alphabet like in "abba" case
      what we are doing here is where we found the duplicate, we are moving the 
      begin pointer to the next index of the duplicate
      */
      begin = map[s[end]] + 1;
    }
    /* add it into hash map and assign the index of that alphabet as a value if 
    already exist then update the value */
    map[s[end]] = end;
    max = Math.max(max, end - begin + 1);
  }
  return max;
};

longestSubstringOptimal2("ab0c0ed");

// Is Valid Sudoku Problem
// Time Complexity = O(n^3)
// Space Complexity = O(1)

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

// can be found on PDF page (25-26)
const isValidSudoku = (board: string[][]) => {
  /* basically we divide the board into 3 * 3 sub grids and check if the sub grid 
  is valid or not if it's valid then we check the row and column of the board

  this loop is responsible for traversing through the all columns of the board 
  and check if the column is valid or not column is only valid if it doesn't 
  contain any duplicate numbers if it's contain any duplicate number then it's 
  not valid below loops checks for all the rows of the board
  */
  // traversing from left to right
  for (let row = 0; row < 9; row++) {
    // traversing through the row
    const set = new Set<string>();
    for (let col = 0; col < 9; col++) {
      // traversing through the column
      const cell = board[row][col]; // getting the cell value row wise
      if (cell === ".") continue;
      if (set.has(cell)) return false;
      set.add(cell);
    }
  }

  // traversing from up to down
  for (let col = 0; col < 9; col++) {
    // traversing through the column
    const set = new Set<string>();
    for (let row = 0; row < 9; row++) {
      // traversing through the row
      const cell = board[row][col];
      if (cell === ".") continue;
      if (set.has(cell)) return false;
      set.add(cell);
    }
  }
  // now we are traversing through the sub-grids 3 x 3
  for (let subRow = 0; subRow < 3; subRow++) {
    // traversing through the sub-grid row
    for (let subCol = 0; subCol < 3; subCol++) {
      // traversing through the sub-grid column
      const set = new Set<string>();
      for (let row = 0; row < 3; row++) {
        // traversing through the row of sub-grid
        for (let col = 0; col < 3; col++) {
          // traversing through the column of sub-grid
          const cell = board[3 * subRow + row][3 * subCol + col];
          /* (these all four loops help us to traverse through sub-grid by sub-grid)
          each index max will be "2" (0 - 2)
          subRow is 0: 3 * 0 = 0 (first row block, rows 0-2).
          subRow is 1: 3 * 1 = 3 (second row block, rows 3-5).
          subRow is 2: 3 * 2 = 6 (third row block, rows 6-8).
          cell formula explanation
          one think i noticed in these type of calculation like calculating the cell 
          number or box number or something like that what we do is we multiply the 
          number of cells in row wise with "row" and then add current col into it this 
          will give us the exact cell number and same case with columns also it might be wrong
          see we have 3 (in row wise) x 3 (in col wise) = 9 sub-grids
          so in order to traverse through the rows of entire board we have 9 boxes in each row
          if we divide 9 by 3 (because 3 sub-grids in row wise) we can get 3 subRows ~9 boxes (row wise)
          so if we add row into 3 (subRows * 3) it will give us the exact box (row wise)
          and the same rule applies for column wise box calculation
          */
          if (cell === ".") continue;
          if (set.has(cell)) return false;
          set.add(cell);
        }
      }
    }
  }
  return true;
};

/*

|'5', '3', '.' | '.', '7', '.' | '.', '.', '.'| as you can see that we have three sub rows (first line of   
|'6', '.', '.' | '1', '9', '5' | '.', '.', '.'| each sub-grid) in the first row of entire board so we can   
|'.', '9', '8' | '.', '.', '.' | '.', '6', '.'| write it as "3 * subRows" = (first row of entire board) so
----------------------------------------------- if we want the exact box in the first "row" of entire
|'8', '.', '.' | '.', '6', '.' | '.', '.', '3'| board we simple need to add "row" into it. this rule 
|'4', '.', '.' | '8', '.', '3' | '.', '.', '1'| will also same for the columns
|'7', '.', '.' | '.', '2', '.' | '.', '.', '6'|
-----------------------------------------------
|'.', '6', '.' | '.', '.', '.' | '2', '8', '.'|
|'.', '.', '.' | '4', '1', '9' | '.', '.', '5'|
|'.', '.', '.' | '.', '8', '.' | '.', '7', '9'|


*/
isValidSudoku(board);

// isValid Sudoku (Optimized Solution)
// can be found on PDF page (25-26)
const isValidSudoku_Pt2 = (board: string[][]) => {
  const set = new Set();

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const cell = board[row][col];
      if (cell === ".") continue;
      const subBoxRowNum = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      /* we dividing because we want to traverse through sub-box by sub-box so we are 
      just getting the box number from 3 x 3 sub-grid because we are iterating on 9 x 9 
      and we want to get the 3 x 3 that's why we are doing that if we will do how we 
      done above in then we wouldn't have to divide by 3 
       this formula is used to find the sub-box number in 9 x 9 matrix. let's discuss 
      how this formula is generated so if we want to find the cell number in 3 x 3 box 
      we can use this formula this formula gives us the exact cell number (3 * row + col)
      and if take this formula into big 9 x 9 square in 9 x 9 we have 9 (3 x 3) sub-boxes 
      so the formula became like this
       3 * Math.floor(row/3) + Math.floor(col/3) we are dividing row and col by 3 because 
       by dividing row by 3 it will give us the row of the sub-box and if we divide col by 
       3 it will give us the exact column of the sub-box in this way we can find the box number

      and in this comment out part we are checking if the cell value is already exist in 
      the rows, cols and boxes if it's exist then return false otherwise add it into the 
      rows, cols and boxes
      
      this needs to check how rows check like on row = 0 still it will check rows[row].has(cell)

      if (rows[row].has(cell) || cols[col].has(cell) || boxes[subBoxNum].has(cell)) return false;
      rows[row].add(cell);
      cols[col].add(cell);
      boxes[subBoxNum].add(cell)
      instead of this we can create a variable which can represent the current index and its values
      

      take an example of board[4][0] = 8
      in this solution what we are doing is we are check if 8 is in col 1 or entire board no 8 is 
      in sub-box 4 no 8 is in row 4 no this is how we are checking and storing it in set
      but we know that 8 are also present in other places like at board[3][3] and in sub-box 1 in 
      the board but this will never be same as 8 stored in 4th sub-box because the way we are 
      storing values in set (row-index with value and col-index with same value) then 
      (sub-box index with same value)
      */
      const rows = `row : ${row}, value : ${cell}`;
      const cols = `col : ${col}, value : ${cell}`;
      const subBox = `sub-box : ${subBoxRowNum}, value : ${cell}`;

      if (set.has(rows) || set.has(cols) || set.has(subBox)) return false;

      set.add(rows);
      set.add(cols);
      set.add(subBox);
    }
  }
  return true;
};

// Jump Game Problem (With Brute Force & backtracking)
// Time Complexity = O(2^n)
// Space Complexity = O(n)

/* Given an array of non-negative integers nums, you are initially positioned 
at the first index of the array.
Each element in the array represents your maximum jump length at that position.
let's say if we are at index 0 and the value of index 0 is 2 so we want to move 
forward 2 steps and if we are at index 1 and the value of index 1 is 3 so we want 
to move forward 3 steps
Determine if you are able to reach the last index.
*/

const canJumpSimple = (nums: number[], index = 0): boolean => {
  // you can get better understanding of this algo by comparing it with the tree on the PDF (page 29)
  /*
    if (index === nums.length - 1) return true;

  const maxIndex = Math.min(nums.length - 1, index + nums[i]); 

  for (let i = 1; i <= nums[index]; i++) { 
    
    we are starting from 1 because we don't want to repeat the same element again and again 
    and if start i from 0 its means that when we pass index + 1 in recursion it will call 
    the same function again and again and if i = 0 it will add noting into the index and 
    will call the same function again and again
    

    return canJumpSimple(nums, index + i);

    we are passing index + i because we want to move forward in the array and we want to 
    move forward in the array based on the value of the current index
    there is a problem in this code and that is the index + 1 can go out of bound let's see how 
    let's say we have an array of [1, 10, 4] as you can see the the length is 3 and at 
    second index the loop will try to iterate 10 times means the value of i will become greater 
    the length of array 9 or 10 means it can be pass like that i = 9, index + i (index + 9) 
    and when the greater index than the actual indexes present in the array it's value become 
    undefined in the loop at this condition i <= nums[index]; 

    // however this will not go out of bound because when it will start looping through 10 times 
    at the first iteration of 10th loop it's index will become equal to the length of an array 
    and it will return true and will not go out of bound
  }

    return false
  */

  // So here is the without out of bound version

  if (index === nums.length - 1) return true;

  /* this is how we can avoid out of bound bug when value of (index + nums[index]) is 
  lesser pick that one and when it's value become greater then pick last index of array
  */
  const maxIndex = Math.min(nums.length - 1, index + nums[index]);

  /* we are adding index in the current index value (index + nums[index]) cuz we are 
  also adding index in the loop initializing (let i = index + 1) so like if we are 
  adding here it's means that we also need to add into maxIndex for proper comparison 
  (seems like if adding LFS must add it to the RHS)
  */

  for (let i = index + 1; i <= maxIndex; i++) {
    /* we are starting from 1 because we don't want to repeat the same element again and again
    and if start i from 0 its means that when we pass index + 1 in recursion it will call the 
    same function again and again and if i = 0 it will add noting into the index and will call 
    the same function again and again


    For example, if you're at index 2 and nums[2] is 3, you can make up to 3 steps from index 2,
    which means you can reach indices 3, 4, or 5. This is calculated as 2 (current index) + 3 
    (steps) = 5 (furthest reachable index).
    */
    if (canJumpSimple(nums, i)) {
      // if this returns true then only returns true value from the function
      return true;
      /* we are passing index + i because we want to move forward in the array and we want to 
      move forward in the array based on the value of the current index
      */
    }
  }

  return false;

  // this solution works but its time complexity is much greater so we will use memoization
};

canJumpSimple([2, 3, 1, 1, 4]);

const canJumpFromPosition = (
  nums: number[],
  index: number,
  memo: boolean[]
): boolean => {
  if (memo[index] !== undefined) {
    /* we are checking for if something is available at current index cuz we already 
    set true at last index so it will return true for first base condition meet
    */
    return memo[index];
  }

  /* we are add index into our current index value because it's the same as passing 
  index + i into recursion function we are just doing it early and passing i into 
  recursion function later
  */
  const maxIndex = Math.min(nums.length - 1, index + nums[index]);

  for (let i = index + 1; i <= maxIndex; i++) {
    if (canJumpFromPosition(nums, i, memo)) {
      /* here is what is happening here let me explain according to the given input
       as we know that we are already setting true at the last index of an array because 
       this will be our base case so when DFS go deeper and deeper and it will reach at 
       the 4 index and our base condition will be true and then it will return the boolean 
       value stored at last index (in this case it returns true) so when it returns true 
       means the upper most in call stack return true it will go in the if condition and 
       there it will store true at current index then it will return true means the second 
       last function in call stack returns true and then store true at current index and the 
       cycle continues
      */
      memo[index] = true;
      return true;
    }
  }
  memo[index] = false;
  return false;
};

// Jump Game Problem (With memo)

const canJumpWithMemo = (nums: number[]): boolean => {
  const memo: boolean[] = [];
  memo[nums.length - 1] = true; // setting true for base condition
  return canJumpFromPosition(nums, 0, memo);
};

canJumpWithMemo([2, 3, 1, 1, 4]);

/* weather or not we can reach the end from certain index depends on weather we could 
reach end from one of its child
(means that it all depends on if we can reach at end depends on if we can reach at end 
  from one of its child (child of first index we are talking about))
canJump problem optimized solution (With Dynamic Approach)
Detailed Explanation : https://youtu.be/TEQAWdTrOvk?list=PL8EhujvLdk7WuGPfsDpE8jQMwv7I2YitK&t=562
we can get better understanding by comparing the code execution with graph in PDF (page 30)
*/
const canJumpWithDynamic = (nums: number[]) => {
  /* in all of the jump game problem we are actually iterating or traversing with +1 you 
  can notice it in code execution like take an example from this algo we are basically 
  starting loop from 2nd last index (which is 4th one) according to the given input 
  [3, 3, 1, 0, 1, 2] but if we notice that our maxIndex will 5 and moreover the value of 
  i will also be 5. but it will not matter because we are adding +1 on both side on 
  maxIndex or on i side that's why solution still works
  */
  const memo: boolean[] = [];
  memo[nums.length - 1] = true;
  for (let i = nums.length - 2; i >= 0; i--) {
    /* we are starting loop from 2nd last index because we already set the last index 
    value to true
    */
    const maxIndex = Math.min(nums.length - 1, i + nums[i]);
    memo[i] = false;
    for (let j = i + 1; j <= maxIndex; j++) {
      /* we are starting j with i + 1 we are checking if we can jump from the current position 
      we are adding + 1 because we don't want to check that weather we can reach to the same index 
      we are jumping from we actually want to check for the next index that's why we are adding +1
      see it's pretty simple to understand that first we have to select the 2nd last 
      index (parent index) which we select with outer loop then we need to compare that 
      with child index value so in-order to select child index we need to add +1 into 
      it's parent index then we will get the boolean value stored at child index (child 
        index is greater by +1 in magnitude as compare to parent index) (e.g: you will 
          get better understand by reading from PDF) that's why we are initializing j by +1
      */
      if (memo[j]) {
        memo[i] = true;
      }
    }
  }
  return memo[0];
};

canJumpWithDynamic([2, 3, 1, 1, 4]);

// What is Greedy Algorithm Technique ?
// Greedy Algorithm follows local optimal choice at each stage with intend of finding global optimum

// can Jump Game (with Greedy Technique Approach) most optimized and easy among the all of can Jump algos
// Time Complexity : O(n)
const canJumWithGreedy = (nums: number[]) => {
  /* what i understand from the code execution is the sum of current index and current 
  index value is equal or greater than the good index if it is then re-assign the current index
  in this code basically what we are trying to do the make the goal index closer to the 
  start index
  and we are starting loop from the second last index and check if the last index index is 
  lesser or equal to the sum of current index and the value of current index
  here is the trick when we are adding the current index with it's value it means that 
  let's take an example of an input at first we have goodIndex(4) if the the value stored 
  at 3rd index + current index (3) becomes greater then goodIndex(4) we can able to reach 
  at 4th index. even if the value stored at 3rd index 1 this can sum up and become equal 
  to goodIndex so reachable to next index. basically we just need a sum value who is bigger 
  then the next index of the current index if it is bigger it's means that there is a path 
  and we can reach to next index
  see if [1, 3, 1, 1, 4]
  at index 1 we have 3 we can take 3 jumps why we need to take 1 or 2 jump when we can reach 
  to the goal at 1 jump if we take 1 or 2 jump then we have to take more jumps from index 2 
  and 3 then we can able to reach goal index
  [1, 3, 4]
  so then we just need to check if current index and it's value sum is bigger then next index 
  path is possible even if the value is 1 at current index (2nd last index) it's we can still 
  make a path to the goal because see current index is just 1 number smaller then next index 
  so we just need 1 value to become equal to next index (if it's equal re-assign the goodIndex 
  to the current index)
  by continuously doing this we are moving the goal closer to the start index when we re-assign 
  the goodIndex then there is no need to go to the last index then we should find a way to reach 
  that (re-assigned) index because that index will lead us to the goal index
  */
  let goodIndex = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (goodIndex <= i + nums[i]) {
      /* nums[i] is the jump length when we finds that (i + nums[i]) is greater than the goodIndex 
      we are shifting goodIndex to the i (from which we are jumping)
      i + nums[i] means that we are adding the current index and its value
      */
      goodIndex = i;
    }
  }

  return goodIndex === 0;
};

canJumWithGreedy([2, 3, 1, 1, 4]);

// Implement LRUCache Problem without using Map() and Set() (Least Recently Used Cache)
// Detailed Explanation can be found on PDF (page 40-43)

class Node {
  key: number;
  value: number;
  next: Node | null;
  prev: Node | null;
  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  capacity: number;
  head: Node | null;
  tail: Node | null;
  map: Record<number, Node>;
  size: number;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = null;
    this.tail = null;
    this.map = {};
    this.size = 0;
  }

  get(key: number) {
    if (this.map[key]) {
      const node = this.map[key];
      /* these both methods are responsible for setting and removing the node from 
      LRU and MRU remove method remove the node from the list and setHead will again 
      add it to the front
      */
      this.remove(node);
      this.setHead(node);
      return node.value;
    }
    return -1;
  }

  put(key: number, value: number) {
    if (this.map[key]) {
      const node = this.map[key];
      node.value = value;
      // we are call both method because we want to make it head means making that node to LRU
      this.remove(node);
      this.setHead(node);
    } else {
      const newNode = new Node(key, value);
      if (this.size >= this.capacity) {
        /* we are removing tail because this is how LRU works remove least recently node in 
        our case tha tail node is LRU so we are removing the tail node
        */
        delete this.map[this.tail!.key];
        this.remove(this.tail!);
      }
      this.setHead(newNode);
      this.map[key] = newNode;
      this.size++;
    }
  }

  private setHead(node: Node) {
    /* there are two main task of setHead method
    the main task of setHead method is just like prepending (setting at first) the node 
    in the linked list
    1) first set the next pointer of newNode is to the previous added node (this.head)
    2) make the previous pointer of newNode is null
    3) then connect the previous pointer of old node (this.head) to the newNode
    4) then set the newNode as a head and the last condition setting tail will only runs 
    at first time because when list is empty the tail pointer is also null so when adding 
    node in the list for the first time tail is null so when tail is null set the node to 
    tail and when we try to add new node tail will not null so it fails every time

    // Explanation : https://youtu.be/7ABFKPK2hD4?t=448 
    consider head pointer will point to the most recently used node and tail pointer will
    point to the least recently used node then it will a lot more easier to understand
    */
    node.next = this.head;
    node.prev = null;
    // in-order to connect the existing node with the new node we have to add this line
    if (this.head) this.head.prev = node;
    this.head = node;

    /* this line will only runs ons when there is nothing in the linked list means only 
    runs at first node*/
    if (!this.tail) this.tail = node;
  }

  private remove(node: Node) {
    /* (passing node to remove method = currentNode)
    there are two main tasks
    1) make the other-node's (other node which is not passed into the remove method) next 
    pointer to null by setting current node.next (see if the currentNode.previous is not 
      null it's means that currentNode.next will definitely be null) other-node's next 
      pointer will set to null (because we are removing the currentNode)
    2) if the passing node is MRU set it to LRU (and in this case the MRU is tail pointer 
      and LRU is head pointer) and vice versa
    */
    if (node.prev) {
      /* one more thing is that we are assigning the node.nex in either if or else block 
      and node.prev in second if-else block by doing this less risk of error
      */
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      /* combining the before node to the currentNode to the other-node's previous pointer 
      (in our case we have 2 capacity so before node is null)
      */
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }
}

const lru = new LRUCache(2);

lru.put(1, 1); // null
lru.put(2, 2); // null
lru.get(1); // 1
lru.put(3, 3); // null
lru.get(2); // -1
lru.put(4, 4); // null
lru.get(1); // -1
lru.get(3); // 3
lru.get(4); // 4

// Permutation Problem with recursive backtracking
// Detailed Explanation can be found on PDF (page 43)
// Space Complexity : O(N)
// permutation [1]
// Fn1 - nums = [1, 2, 3] 2 (creating array of 2 length)
// Fn2 - nums = [2, 3] 1 (creating array of 1 length)
// Fn3 - nums = [3] 0 (creating array of 0 length)
// Fn3 - nums = [] (not creating any array)

// 4 : n + 1
// 2 + 1 + 0 : (n - 1) + (n - 2) + (n - 3) + ... ---> O(N)

// Time Complexity : O(N!)

// 3 * 2 * 1 = n * (n - 1) * (n - 2) * ... ---> O(N!)
const permute = (
  nums: number[],
  permutation: number[] = [],
  answer: number[][] = []
) => {
  if (nums.length === 0) {
    /* we are creating a new array here because we know that array is reference type so if we 
    just push the simple array into the answer array it will push the reference of the array
    and if we change the array it will change the reference of the array so that's why we are 
    copying the array so that in nested recursion if we change the array (we are changing when doing 
    permutation.pop()) it will not change the array that is pushed into the answer array
    */
    answer.push([...permutation]);
  }

  for (let i = 0; i < nums.length; i++) {
    /* in the first loop we have num.length 3 in next we have 2 then 1 cuz we are filtering it ans 
    passing reaming choices
    */
    permutation.push(nums[i]);
    /* if we pick 1 and push it into the array it means that we have 2, 3 so this is what we are 
    getting the remaining elements of an array*/
    const choice = nums.filter((_, index) => index !== i);
    permute(choice, permutation, answer);
    permutation.pop();
    /* we are popping out an elements in the array because when we are backtracking we don't 
    want to include the previous permute elements to include in the next permutation array
    and we are popping out last two elements in case of input [1, 2, 3] because at initial 
    we have 3 choices then at second level we have 2 choices (that's why we are popping out 
    2 elements) then at level 3 we have only one choice
    */
  }
  return answer;
};

permute([1, 2, 3]);

// InOrder Traversal of Binary Tree (Morris Traversal)
// Time Complicity : O(N)
// Space Complicity : O(1)

// Detailed Explanation can be found on PDF (page 44-45)

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// InOrder Traversal to Binary Tree (Morris Traversal) without using recursion and stack (extra space)
// Time Complexity : O(N)
// Space Complexity : O(1)
// Detailed Explanation can be found on PDF (page 44-45)
// Video Explanation : https://youtu.be/fow18kktPMM?list=PL8EhujvLdk7WuGPfsDpE8jQMwv7I2YitK&t=684
const inOrderTraversal = (root: TreeNode | null) => {
  let current = root;
  const answer = [];
  while (current) {
    if (!current.left) {
      /* predecessor meaning = a person who held a job or office before the current holder.
      at first iteration when left is not null we go in the else block and in there we find 
      the predecessor (3 in this case ) and set 3-node.right to current node (root not) at 
      pushing 3 since we already set 3.right to root so we again come back to root and check 
      if the left is null or not since it is not so we will again come back to the else block 
      and find the predecessor and check if the predecessor.right is null or not since at 
      second time it is not we we will re-assigned the current to current.right telling it to 
      go to the right side of the tree
      */
      answer.push(current.val);
      current = current.right;
    } else {
      let predecessor = current.left; // starts with left then move right to the leaf node
      while (predecessor.right && predecessor.right !== current) {
        // Question : can you help me to understand why we need this condition predecessor.right !== current with example ?
        // Answer : because
        predecessor = predecessor.right;
      }
      if (!predecessor.right) {
        // if thread is not created
        predecessor.right = current;
        // answer.push(current.val); // for preOrder
        current = current.left; // move current to the lower left side
      } else {
        predecessor.right = null;
        answer.push(current.val); // for preOrder Traversal we just need to push the current.val before we set the predecessor.right to null (means remove this line from here and paste it in the if block after setting predecessor.right to current)
        current = current.right; // we assign current to current.right because we already visited the left side of the tree or sub-tree so now we need to visit the right side of the tree
      }
    }
  }
  return answer;
};

const root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);

inOrderTraversal(root);

// Best Time to Buy and Sell Stocks Problem (With Brute Force Approach)

const getProfit = (prices: number[]) => {
  let buyPriceIndex = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    // first of all we are finding the minimum price in the array
    if (prices[i] < prices[buyPriceIndex]) {
      buyPriceIndex = i;
    }
  }
  let maxProfitDayIndex = buyPriceIndex;
  for (let j = maxProfitDayIndex; j < prices.length; j++) {
    if (prices[j] > prices[maxProfitDayIndex]) {
      maxProfitDayIndex = j;
    }
  }
  return prices[maxProfitDayIndex] - prices[buyPriceIndex];
};

getProfit([7, 1, 5, 3, 6, 4]);

const getProfit_pt2 = (prices: number[]) => {
  let minBuyPrice = prices[0];
  let max = 0;

  for (let i = 1; i < prices.length; i++) {
    const sellPrice = prices[i];
    const profit = sellPrice - minBuyPrice;

    /*
    we are countering the scenario of accidentally picking the sell date before the buy date 
    is we actually storing the max value in max variable for example if we pick 7 as buy date
    and 1 as sell date then the profit will be -6 and -6 is not a profit it is actually a loss 
    */

    /* get the maximum value from the array
    not just simply get the maximum value from the array if we do this there might 
    be a chance of picking the sell date first and buy date later after the sell 
    date which is wrong so the trick here is to first get the profit (which is 
    calculate by subtracting the prices[i] value from the first value) and then 
    compare it with the max variable
    */
    max = Math.max(max, profit);

    /* basically get the min value from the prices array
    by comparing the first value from the array and the rest of them if we find a min 
    value then the first value in the array update the minBuyPrice value
    */
    minBuyPrice = Math.min(minBuyPrice, sellPrice);
  }
  return max;
};

getProfit_pt2([7, 1, 5, 3, 6, 4]);

// Time Complexity : O(N)
// Space Complexity : O(1)
// Detailed Explanation can be found on PDF (page 53-54)
// sliding window technique
const getProfitWithTwoPointers = (prices: number[]) => {
  let left = 0;
  let right = 1;
  let max = 0;
  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      max = Math.max(max, prices[right] - prices[left]);
    } else {
      left = right;
    }
    right++;
  }
  return max;
};

getProfitWithTwoPointers([7, 1, 5, 3, 6, 4]);

// Implement strStr() method (with brute force approach)
// Time Complexity : O(n*m)
// n = length of string
// m = length of substring
// Space Complexity : O(1)

const strStr = (string: string, substring: string) => {
  if (substring === "") return 0;
  for (let i = 0; i <= string.length - substring.length; i++) {
    /* we don't need to iterate through the whole string we just need to iterate 
    through the string length - substring length because if we iterate through 
    the whole string it will go out of bound
    let's say we have a string hello and substring ell. substring have 3 characters 
    and string have 5 characters mean we only iterates through that character after 
    which we have only 3 characters left (cuz we have 3 characters long substring)
    check match
    */
    let j = 0;
    while (j < substring.length && substring[j] === string[i + j]) {
      /* we are comparing the each character of the string with the first character 
      of the substring if first one matched then start comparing rest of character 
      of substring with the next character of the string
      */
      j++;
    }

    /* comparing the j with substring length because we have to match the substring 
    if j increments substring-length times it's means that we have found the substring 
    because the length is matched
    */
    if (j === substring.length) return i;
  }
  /* if loop finished it's means that we have searched the string and not found the 
  substring then return -1 */
  return -1;
};

strStr("hello", "ell");

/* 
Implement strStr() method (with (Knuth-Morris-Pratt) KMP Algorithm
Time Complexity : O(n + m)
n = length of string
m = length of substring
Space Complexity : O(n)
Full Detail Explanation can be found on PDF (page 46-52)
video Explanation : https://www.youtube.com/watch?v=GTJr8OvyEVQ
                    https://www.youtube.com/watch?v=JoF0Z7nVSrA
*/

/* if there is a less chance of matching the substring then KMP is not a very good choice
(e.g) Main string = ABCDEF and Substring = XYZ in that case the the upper solution is fine
where the KMP is useful and the upper solution (brute force)  is not very useful is when 
(e.g) Main string = AAAXAAAX and substring = AAAX 
now if we use the brute force solution it will iterate through the whole substring just to find 
the last character will not match then we'll compare the AAXA and then second last character will 
not match this is pretty annoying so in that case KMP is useful
in that case the time complexity of the brute force solution will be O(n*m) and the time complexity
of the KMP will be O(n + m) so KMP is better in that case
*/
// Main function to find the index of the first occurrence of the substring in the main string
const strStr_pt2 = (string: string, substring: string): number => {
  // If the substring is empty, return 0 (by convention, empty substring is found at the start)
  if (substring === "") return 0;

  // Build the pattern (KMP prefix table) for the substring
  const pattern = buildPattern(substring);

  // Check if the substring matches the main string using the pattern
  return doesMatch(string, substring, pattern);
};

// Function to build the pattern (also known as prefix table) for the substring using KMP algorithm
const buildPattern = (substring: string): number[] => {
  // Initialize the pattern array with 0s. Length matches the length of the substring.
  const pattern = new Array(substring.length).fill(0);

  // 'j' is the length of the longest proper prefix which is also a suffix
  let j = 0;

  // 'i' is the current character being checked, starting from the second character (index 1)
  let i = 1;

  // Loop through the substring to build the pattern
  while (i < substring.length) {
    // If characters match, update the pattern and move both pointers forward
    if (substring[j] === substring[i]) {
      /*
      Compare substring[3] (a) and substring[0] (a). This does match! This means 
      the first character of the substring matches a suffix at index 3, so 
      pattern[3] = 1 (the length of the matched prefix is 1).
      Move i to i = 4. Now, compare substring[4] (b) and substring[1] (b). This 
      also matches! So the matched prefix extends, and pattern[4] = 2 
      (the length of the matched prefix is 2)

      The prefix that matches the suffix is always at the start of the substring, 
      and the suffix that matches it is always at the end of the substring, 
      ending at index i.
      */ 
      pattern[i] = j + 1; // Store the length of the matched prefix
      i += 1; // Move to the next character
      j += 1; // Extend the matched prefix length
    } else {
      // If characters don't match and 'j' is at the beginning, move 'i' to the next character
      if (j === 0) {
        pattern[i] = 0; // No match, so store 0
        i += 1; // Move to the next character
      } else {
        // If characters don't match but we have a matched prefix, fallback to the previous prefix length
        /*
        We are comparing two characters from the main string (string[i]) and the substring 
        (substring[j]), and they do not match.
        However, we've already successfully matched some characters of the substring before 
        this mismatch (i.e., j > 0).
        */ 
        j = pattern[j - 1]; // Fall back in the pattern table
      }
    }
  }

  // Return the built pattern (prefix table)
  return pattern;
};

// Function to check if the substring matches any part of the main string using KMP algorithm
const doesMatch = (
  string: string,
  substring: string,
  pattern: number[]
): number => {
  let i = 0; // 'i' is the index for the main string
  let j = 0; // 'j' is the index for the substring

  // Loop through the main string
  while (i < string.length) {
    // If characters match, move both 'i' and 'j' forward
    if (string[i] === substring[j]) {
      i += 1;
      j += 1;
    } else {
      // If characters don't match and 'j' is at the beginning, just move 'i' forward
      if (j === 0) {
        i += 1;
      } else {
        // If characters don't match, but there's a matched prefix, use the pattern to skip comparisons
        j = pattern[j - 1]; // Jump back in the substring using the pattern table
      }
    }

    // If we reach the end of the substring, a match is found
    if (j === substring.length) {
      // Return the index where the substring starts in the main string
      return i - substring.length;
    }
  }

  // If no match is found, return -1
  return -1;
};

// Example usage of the function
strStr_pt2("abxabcabcaby", "abcaby"); // This should return the index 6 (where 'abcaby' starts in 'abxabcabcaby')
