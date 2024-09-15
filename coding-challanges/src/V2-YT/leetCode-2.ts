import { LinkedList, NodeType } from "../YT/DSA/LinkedList/linkedList";

export {};

/* 
****** Sliding Window Technique ******
Given an array of integers nums that is already sorted in non-decreasing order, 
find two numbers such that they add up to a specific target number. Let these two 
numbers be nums[index1] and nums[index2] where 1 <= index1 < index2 <= nums.length.
*/
function minSubArrayLen(s: number, nums: number[]) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    /* When the current sum is less than s, it means that the current window (subarray) 
      is not yet valid, as it does not meet the requirement of having a sum of at least s. 
      Therefore, we need to expand the window by moving the right pointer to the right 
      and adding more elements to the current sum
      */
    while (sum >= s) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 3, 4])); // 2

/*
  Given a sorted array of integers, create a new array containing the squares of all 
  the numbers from the input array, also sorted in ascending order.
  */
function sortedSquares(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);
  let left = 0;
  let right = n - 1;
  let position = n - 1;

  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    /*which one square is bigger add it to the last un-assigned index (at position index)*/
    if (leftSquare > rightSquare) {
      result[position] = leftSquare;
      left++;
    } else {
      result[position] = rightSquare;
      right--;
    }
    position--;
  }

  return result;
}

// Example usage:
console.log(sortedSquares([-4, -1, 0, 3, 10])); // Output: [0, 1, 9, 16, 100]
console.log(sortedSquares([-7, -3, 2, 3, 11])); // Output: [4, 9, 9, 49, 121]

function mergeInterval(intervals: number[][]) {
  if (intervals.length <= 1) return intervals;

  /* Sort intervals by the start time because that will make it easier*/
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [currentStart, currentEnd] = intervals[0];

  for (const [start, end] of intervals) {
    if (start <= currentEnd) {
      /* If we see and interval then we keep updating the currentEnd 
      (the overlapped interval last value) value because*/
      currentEnd = Math.max(currentEnd, end);
    } else {
      /* If no interval then push it into result array */
      merged.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
    }
  }

  // Add the last interval
  merged.push([currentStart, currentEnd]);

  return merged;
}
mergeInterval([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
]); // Output: [[1, 6], [8, 10], [15, 18]]
mergeInterval([
  [1, 4],
  [4, 5],
]); // Output: [[1, 5]]
mergeInterval([
  [1, 10],
  [2, 6],
  [8, 10],
  [15, 18],
]); // Output: [[1, 10], [15, 18]]

function insert(intervals: number[][], newInterval: number[]) {
  const merged = [];
  let i = 0;
  const n = intervals.length;

  // Add all intervals that end before the new interval starts (mean put them before the new interval)
  /* [ [1, 2] [6, 9] ] [3, 5] */
  while (i < n && intervals[i][1] < newInterval[0]) {
    merged.push(intervals[i]);
    i++;
  }

  // Merge overlapping intervals with the new interval
  /* [ [1, 3] [6, 9] ] [2, 5] */
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  merged.push(newInterval);

  // Add all intervals that start after the new interval ends (mean put them after the new interval)
  while (i < n && intervals[i][0] > newInterval[1]) {
    merged.push(intervals[i]);
    i++;
  }

  return merged;
}

// Example usage:
console.log(
  insert(
    [
      [1, 2],
      [6, 9],
    ],
    [3, 5]
  )
); // Output: [[1, 5], [6, 9]]
console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16],
    ],
    [4, 8]
  )
); // Output: [[1, 2], [3, 10], [12, 16]]

// ########### MUCH SIMPLER VERSION OF INSERT INTERVAL ###########

function insertSimpler(intervals: number[][], newInterval: number[]) {
  const res = [];

  for (let i = 0; i < intervals.length; i++) {
    if (newInterval[1] < intervals[i][0]) {
      res.push(newInterval);
      return res.concat(intervals.slice(i));
    } else if (newInterval[0] > intervals[i][1]) {
      res.push(intervals[i]);
    } else {
      newInterval = [
        Math.min(newInterval[0], intervals[i][0]),
        Math.max(newInterval[1], intervals[i][1]),
      ];
    }
  }

  res.push(newInterval);

  return res;
} // [3, 9]
insert(
  [
    [1, 2],
    [3, 5],
    [6, 7],
    [8, 10],
    [12, 16],
  ],
  // [3, 9] or
  [3, 20] // to run the res.push(newInterval) line
);

// https://www.youtube.com/watch?v=gBTe7lFR3vc

// Fast and slow pointer

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);

const ifCycleExistsInLinkedList = <T>(head: NodeType<T>) => {
  if (!head) return false;
  let slow = head;
  let fast = head;

  while (fast && fast.next !== null) {
    slow = slow.next!;
    fast = fast.next.next!;
    if (slow === fast) return true;
  }
  return false;
};

ifCycleExistsInLinkedList(list.head); // false

/* Learning Cyclic Sort 

Video Explanation : https://www.youtube.com/watch?v=JfinxytTYFQ&t=68s
if the numbers are from 1 to N and no number is missing this is the best algo for that particular case
*/
// basic implementations
const cyclicSort = (arr: number[]) => {
  let p = 0;
  while (arr[p] - 1 !== p) {
    let a = arr[p];
    let b = arr[a - 1];

    arr[a - 1] = a;
    arr[p] = b;
    if (arr[p] - 1 === p) {
      p += 1;
    }
  }
  return arr;
};

cyclicSort([3, 5, 2, 1, 4]);

// Q) 33. Search in Rotated Sorted Array

const search = (arr: number[], target: number) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);

    // Check if the middle element is the target
    if (arr[middle] === target) {
      return middle;
    }

    // Determine if the left half is sorted
    if (arr[low] <= arr[middle]) {
      // Check if the target lies within the left half -> if left is sorted
      if (target >= arr[low] && target < arr[middle]) {
        high = middle - 1; // Search in the left half
      } else {
        low = middle + 1; // Search in the right half
      }
    } else {
      // Otherwise, the right half is sorted
      // Check if the target lies within the right half -> if right is sorted
      if (target > arr[middle] && target <= arr[high]) {
        low = middle + 1; // Search in the right half
      } else {
        high = middle - 1; // Search in the left half
      }
    }
  }

  return -1; // Target not found
};

const arr = [7, 8, 9, 1, 2, 3, 4, 5, 6];
let target = 1;
console.log(search(arr, target)); // Output should be the index of the target

// Example strings to check if they are anagrams
const s = "catc";
const t = "tcac";

/**
 * Function to check if two strings are anagrams of each other
 * @param t - the first string
 * @param s - the second string
 * @returns boolean - true if they are anagrams, false otherwise
 */
const validAnagram = (t: string, s: string): boolean => {
  // Step 1: Check if the lengths of the strings are equal
  // If lengths are not equal, they cannot be anagrams
  if (s.length !== t.length) return false;

  // Step 2: Initialize hash maps to store character frequencies for both strings
  // hashS will store character frequency for string 's'
  // hashT will store character frequency for string 't'
  const hashS: Record<string, number> = {};
  const hashT: Record<string, number> = {};

  // Step 3: Iterate through each character in both strings
  // Build frequency maps for both 's' and 't' strings simultaneously
  for (let i = 0; i < s.length; i++) {
    // If the character in 's' is not present in hashS, initialize it to 0 and increment
    hashS[s[i]] = (hashS[s[i]] ?? 0) + 1;

    // Similarly, for string 't', initialize and increment frequency in hashT
    hashT[t[i]] = (hashT[t[i]] ?? 0) + 1;
  }

  // Step 4: Compare the frequency of each character in both hash maps
  // If frequencies do not match for any character, return false
  for (let i = 0; i < t.length; i++) {
    // Check if the frequency of the character in 't' is the same as in 's'
    if (hashT[t[i]] !== hashS[t[i]]) {
      // If any character's count doesn't match between the two strings, they are not anagrams
      return false;
    }
  }

  // Step 5: If all character frequencies match, the strings are anagrams
  return true;
};

// Example usage to check if the strings 't' and 's' are anagrams
console.log(validAnagram(t, s)); // Output: true

const maxSubArray = (arr: number[]): number => {
  // Initialize maxSub to the first element as the minimum possible value
  let maxSub = arr[0];
  // Initialize currentSum to 0
  let currentSum = 0;

  // Iterate through each number in the array
  for (const n of arr) {
    // If currentSum becomes negative, reset it to 0 (we don't want negative sums)
    if (currentSum < 0) {
      currentSum = 0;
    }

    // Add the current number to the running sum
    currentSum += n;

    // Update the maximum subarray sum found so far
    maxSub = Math.max(maxSub, currentSum);
  }

  return maxSub; // Return the largest sum of contiguous subarray
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6 (subarray is [4, -1, 2, 1])
