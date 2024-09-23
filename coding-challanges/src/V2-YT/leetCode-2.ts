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
    let b = arr[a - 1]; // number to be replaced at current position (p)

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

const rob = (nums: number[]): number => {
  /*
The idea is to iterate through each house's money value and maintain two variables 
(prev1 and prev2) to keep track of the maximum profit for the previous two houses. 
For each house, the robber has two options: either rob the current house and add 
its value to prev2 (which skips the adjacent house), or skip the current house and 
take the value of prev1 (the previous house). At the end of the loop, prev1 will 
hold the maximum possible profit.
*/
  // Edge case: If there are no houses, the robber can't rob anything
  if (nums.length === 0) return 0;

  // If there's only one house, rob it
  if (nums.length === 1) return nums[0];

  // Initialize two variables to store the max profit up to the previous two houses
  let prev2 = 0; // Represents dp[i-2]
  let prev1 = 0; // Represents dp[i-1]

  // Iterate through each house's money value
  for (const money of nums) {
    // Calculate the maximum profit up to the current house
    const current = Math.max(prev1, prev2 + money);

    // Update prev2 and prev1 for the next iteration
    prev2 = prev1; // on next iteration prev1 will be prev2 because we are moving forward
    /* and after done with current house we'll update prev1 because in next 
    iteration this will indicate the previous adjacent house */
    prev1 = current; 
  }

  // After the loop, prev1 will hold the maximum profit we can rob
  return prev1;
};

// Example usage
const houses = [2, 7, 9, 3, 1];
console.log(rob(houses)); // Output: 12 (rob houses 2, 9, and 1)

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  // Create a dummy node to act as the head of the new merged list
  let dummy = new ListNode();

  // Pointer to track the current position in the merged list
  let current = dummy;

  // While both lists are non-empty, compare their values
  while (l1 !== null && l2 !== null) {
    // If l1's value is smaller or equal, attach it to the current node
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next; // Move l1 forward
    } else {
      // Otherwise, attach l2's node to the current node
      current.next = l2;
      l2 = l2.next; // Move l2 forward
    }

    // Move the current pointer forward
    current = current.next;
  }

  // If any nodes are left in either list, attach them directly
  if (l1 !== null) {
    current.next = l1;
  } else if (l2 !== null) {
    current.next = l2;
  }

  // Return the merged list, which starts from the next node of dummy
  return dummy.next;
}

// Example usage:
const list1 = new ListNode(1, new ListNode(3, new ListNode(5)));
const list2 = new ListNode(2, new ListNode(4, new ListNode(6)));

const mergedList = mergeTwoLists(list1, list2);

// Helper function to print the merged list
const printList = (head: ListNode | null) => {
  let current = head;
  const result = [];
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  console.log(result.join(" -> "));
};

printList(mergedList); // Output: 1 -> 2 -> 3 -> 4 -> 5 -> 6

/*
MY Attempt time exceeded
We have two arrays, nums1 and nums2. We are trying to merge the elements from nums2 
into nums1 in a sorted order. The code starts by looping through each element of 
nums2 (using the variable i), and for each element, it also loops through nums1 
(using the variable j). If two consecutive elements in nums1 are the same, it 
skips to avoid duplicates.

Whenever we find a place in nums1 where the current element from nums2 should go 
(when nums2[i] is less than or equal to nums1[j]), we shift all the elements in 
nums1 one position to the right to make space for the new element. Then, we 
insert the nums2[i] value into the correct spot in nums1.

After going through all elements of nums2, if there are still any leftover 
elements in nums2, they are added to the end of nums1.
*/

function mergeTwoSortedArraysBad(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      debugger;
      if (nums1[j] === nums1[j - 1]) continue;
      if (nums2[i] <= nums1[j]) {
        let k = m - 1;
        while (k >= j) {
          nums1[k + 1] = nums1[k];
          k--;
        }
        nums1[j] = nums2[i];
        n--;
      }
    }
  }
  let a1 = nums1.length - 1;
  for (let j = a1; j >= nums1.length - n; j--) {
    nums1[j] = nums2.pop()!;
  }
}

/*
Good Approach

The algorithm merges two sorted arrays, nums1 and nums2, by using three 
pointers: one (p1) at the end of nums1 (where there's extra space), one 
(p2) at the end of nums2, and one (p3) at m - 1 in nums1, which is the 
last valid element before the extra space. Starting from the back of both 
arrays, it compares elements from nums1[p3] and nums2[p2]. The larger element 
is placed at the end of nums1[p1]. This continues until all elements from 
nums2 are merged into nums1. This approach works because filling from the 
end avoids overwriting elements in nums1 that we haven't compared yet.
*/

function mergeTwoSortedArrays(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  // Pointers for the last elements in nums1, nums2, and the overall result
  let p1 = m - 1; // Pointer for the last element in the valid part of nums1
  let p2 = n - 1; // Pointer for the last element in nums2
  let p3 = nums1.length - 1; // Pointer for the merged array (nums1)

  // Edge case: If nums2 is empty, there's nothing to merge
  if (n === 0) return;

  // Edge case: If nums1 has no valid elements, just copy nums2 into nums1
  if (m === 0) {
    for (let i = 0; i < n; i++) {
      nums1[i] = nums2[i];
    }
    return;
  }

  // Merge nums1 and nums2 from the back
  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p3] = nums1[p1]; // Place larger value from nums1
      p1--;
    } else {
      nums1[p3] = nums2[p2]; // Place larger value from nums2
      p2--;
    }
    p3--;
  }
}

const nums1 = [1, 2, 3, 0, 0, 0];
mergeTwoSortedArrays(nums1, 3, [2, 5, 6], 3);
console.log(nums1);

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  // Edge case: empty tree
  if (!root) return 0;

  let diameter = 0;

  // Helper function to calculate the height of the tree and update diameter
  function height(node: TreeNode | null): number {
    if (!node) return 0; // Base case: null nodes have height 0

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // The diameter at the current node will be the sum of left and right heights
    /*
    Diameter = height(node.left) + height(node.right)
    */
    diameter = Math.max(diameter, leftHeight + rightHeight);

    // Return the height of the current node (1 + the max of its subtrees)
    /*
    we are actually getting max from left and right because if we are at the 
    leaf node then we might not get it so let's imagine we are at a node where
    height of subtrees are not same then we need the max height's subtree to 
    find the diameter of current node
    */
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Start the height calculation and diameter tracking from the root
  height(root);

  return diameter;
}

const node = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

diameterOfBinaryTree(node);

function invertTree(root: TreeNode | null): TreeNode | null {
  // Base case: If the root is null (empty tree), return null
  if (!root) return root;

  // Temporarily store the right subtree
  const temp = root.right;

  // Swap the left subtree with the right subtree
  root.right = root.left;
  root.left = temp;

  // Recursively invert the left and right subtrees
  invertTree(root.left);
  invertTree(root.right);

  // Return the root of the inverted tree
  return root;
}

function replaceElements(arr: number[]): number[] {
  // Step 1: Initialize the current maximum to the last element in the array.
  // This will be used to track the largest value to the right of the current element.
  let current = arr[arr.length - 1];

  // Step 2: Set the last element of the array to -1 as the problem requires.
  // Since there are no elements to the right of the last element, it must be -1.
  arr[arr.length - 1] = -1;

  // Step 3: Loop through the array from the second last element to the first element (right to left).
  for (let i = arr.length - 2; i >= 0; i--) {
    // Step 4: Calculate the maximum between the current maximum value
    // (tracked in the variable 'current') and the value to the right of the current element (arr[i + 1]).
    let max = Math.max(current, arr[i + 1]);

    // Step 5: Update 'current' to the value at the current index.
    // This ensures that 'current' will always hold the original value of arr[i]
    // before we replace it with the maximum value from its right side.
    current = arr[i];

    // Step 6: Replace the current element (arr[i]) with the calculated maximum value
    // so that arr[i] now holds the greatest value to its right.
    arr[i] = max;
  }

  // Step 7: Return the modified array where each element is replaced by the greatest element to its right.
  return arr;
}


replaceElements([17,18,5,4,6,1]) // [18,6,6,6,1,-1]