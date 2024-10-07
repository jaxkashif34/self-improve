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
  /* Main DrawBack if fist number is already it correct 
  position it will not even starts the loop
  */
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

function replaceGreatestRightElements(arr: number[]): number[] {
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

replaceGreatestRightElements([17, 18, 5, 4, 6, 1]); // [18,6,6,6,1,-1]

function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null
): TreeNode | null {
  // If both trees are empty, return null as there's nothing to merge
  if (!root1 && !root2) {
    return null;
  }

  // If one of the trees is empty, return the non-empty tree
  /* In upper we check if both trees are empty :: if that's not the case then it means 
  we know that one of them is empty and other is not empty so we'll check if root1 is empty
  if it is then it means that root2 must not be empty and it has some value
  */ 
  if (!root1) {
    return root2; // If root1 is null, we return root2 (no merge needed for null tree)
  }

  if (!root2) {
    return root1; // If root2 is null, we return root1
  }

  // Add the values of the two root nodes
  const mergedValue = (root1 ? root1.val : 0) + (root2 ? root2.val : 0);
  const newRoot = new TreeNode(mergedValue); // Create a new node with the merged value

  // Recursively merge the left and right subtrees
  // Pass the left children of both trees to merge the left subtree
  newRoot.left = mergeTrees(root1.left, root2.left);

  // Pass the right children of both trees to merge the right subtree
  newRoot.right = mergeTrees(root1.right, root2.right);

  // Return the new merged tree's root node
  return newRoot;
}

/**
 * This function finds the lowest common ancestor (LCA) of two given nodes `p` and `q`
 * in a Binary Search Tree (BST). In a BST, the LCA of two nodes is defined as the
 * deepest node that is an ancestor of both `p` and `q`.
 *
 * @param root - The root node of the BST.
 * @param p - The first node for which we want to find the LCA.
 * @param q - The second node for which we want to find the LCA.
 * @returns The LCA node of `p` and `q`, or `null` if not found.
 */
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  // Base case: If the root is null, there's no tree to traverse, return null.
  if (!root) return null;

  // If the root matches either `p` or `q`, we have found one of the target nodes.
  // Therefore, root is the LCA.
  if (root.val === p?.val || root.val === q?.val) return root;

  // If both `p` and `q` values are less than the current node's value,
  // that means both nodes are located in the left subtree.
  if (p!.val < root.val && q!.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }

  // If both `p` and `q` values are greater than the current node's value,
  // both nodes are located in the right subtree.
  if (p!.val > root.val && q!.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }

  // If one node is smaller and the other node is larger than the current node's value,
  // it means this node is the split point, and hence it is the LCA.
  return root;
}

/* In base 10, taking the modulus of a number with 10 (number % 10) 
will give you the last digit of that number. This works because:

When you divide a number by 10, the remainder is what is left after 
subtracting as many multiples of 10 as possible.

Since each place value in base 10 represents powers of 10, the last 
digit is effectively what's "left over" after dividing by 10.


Example:
  For 1234:
    1234 % 10 = 4 (The last digit is 4)
  For 567:
    567 % 10 = 7 (The last digit is 7)

This technique is generally applicable to numbers in any base, where 
you take the modulus with the base to get the last digit. For example, 
for a number in base 8, you would take number % 8 to get the last digit.
*/

/*
Yes, dividing a number by 10 repeatedly (in base 10) will eventually 
give you the first digit of the number, but you have to continue 
dividing until all other digits are removed.
*/

/**
 * This function determines if a number is a happy number.
 *
 * A happy number eventually reaches 1 after a process of replacing
 * the number by the sum of the squares of its digits.
 *
 * If the number ends in a cycle (not including 1), it is not a happy number.
 *
 * @param n - The number to check.
 * @returns true if the number is a happy number, otherwise false.
 */
function isHappy(n: number): boolean {
  // Create a Set to store numbers we've seen to detect cycles.
  const seenNumbers = new Set<number>();

  // Helper function to calculate the sum of the squares of the digits.
  const sumOfSquares = (num: number): number => {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10; // Get the last digit.
      sum += digit * digit; // Add the square of the digit to the sum.
      num = Math.floor(num / 10); // Remove the last digit.
    }
    return sum;
  };

  // Continue the process until we either find `1` or detect a cycle.
  while (n !== 1) {
    if (seenNumbers.has(n)) {
      // If we've seen this number before, there's a cycle, return false.
      return false;
    }

    // Add the current number to the set of seen numbers.
    seenNumbers.add(n);

    // Replace the number with the sum of the squares of its digits.
    n = sumOfSquares(n);
  }

  // If we exit the loop with `n === 1`, the number is happy.
  return true;
}

// Example usage:
console.log(isHappy(19)); // true (19 is a happy number)
console.log(isHappy(2)); // false (2 is not a happy number)

function getFirstDigit(num: number): number {
  // Remove digits by repeatedly dividing by 10
  while (num >= 10) {
    num = Math.floor(num / 10);
  }
  return num; // At this point, num is the first digit
}

console.log(getFirstDigit(1234)); // Output: 1
console.log(getFirstDigit(56789)); // Output: 5

function getLastDigit(num: number): number {
  return num % 10;
}

console.log(getLastDigit(1234)); // Output: 4
console.log(getLastDigit(56789)); // Output: 9

class Node {
  val: number;
  min: number;
  next: Node | null;

  constructor(val: number, min: number, next: Node | null) {
    this.val = val;
    this.min = min;
    this.next = next;
  }
}

/* This approach stores the minimum value up to and including the current node. 
(current and after that node) */
class MinStackBest {
  private head: Node | null = null;

  /**
   * Pushes a value onto the stack.
   * @param x - The value to push.
   */
  push(x: number): void {
    if (this.head === null) {
      this.head = new Node(x, x, null);
    } else {
      const newMin = Math.min(x, this.head.min);
      this.head = new Node(x, newMin, this.head);
    }
  }

  /**
   * Pops the top value from the stack.
   */
  pop(): void {
    if (this.head !== null) {
      this.head = this.head.next;
    }
  }

  /**
   * Returns the top value of the stack without removing it.
   * @returns The top value.
   */
  top(): number {
    if (this.head !== null) {
      return this.head.val;
    }
    throw new Error("Stack is empty");
  }

  /**
   * Retrieves the minimum value in the stack.
   * @returns The minimum value.
   */
  getMin(): number {
    if (this.head !== null) {
      return this.head.min;
    }
    throw new Error("Stack is empty");
  }
}

// Example usage:
const minStack = new MinStackBest();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // Output: -3
minStack.pop();
console.log(minStack.top()); // Output: 0
console.log(minStack.getMin()); // Output: -2

class MinStack {
  private stack: number[];
  private minStack: number[];

  constructor() {
    // Main stack to store all the elements.
    this.stack = [];
    // Min stack to store the minimum element at each stage.
    this.minStack = [];
  }

  /**
   * Push a value onto the stack.
   * If the value is less than or equal to the current minimum,
   * also push it onto the minStack.
   * @param val - The value to be pushed.
   */
  push(val: number): void {
    // Push the value to the main stack.
    this.stack.push(val);

    /* If the minStack is empty or the new value is <= current min, push it to the minStack.
    * Note: In first condition we are making sure that there must be at least one element in 
      the minStack (so that we can compare it in the next condition or if we have only one element
      then by definition it is also the min so we'll push it to the minStack)
    */
    if (
      this.minStack.length === 0 ||
      val <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(val);
    }
  }

  /**
   * Removes the element on the top of the stack.
   * If the popped element is the minimum, also pop from the minStack.
   */
  pop(): void {
    // Pop the top element from the main stack.
    const poppedElement = this.stack.pop();

    // If the popped element is the same as the top of the minStack, pop it from the minStack.
    if (poppedElement === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  /**
   * Gets the top element of the stack without removing it.
   * @returns The top element of the stack.
   */
  top(): number {
    // Return the top element of the main stack.
    return this.stack[this.stack.length - 1];
  }

  /**
   * Retrieves the minimum element from the stack in constant time.
   * @returns The minimum element of the stack.
   */
  getMin(): number {
    // Return the top element of the minStack, which is the current minimum.
    return this.minStack[this.minStack.length - 1];
  }
}

function removeElementsBad(
  head: ListNode | null,
  val: number
): ListNode | null {
  let current = head;
  while (current && current.next !== null) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  /* this works according to the leetcode but this is not a good approach 
  because in while loop we are checking if next exists then we are only 
  checking but in cases if we want to remove the head then we have to 
  get help like these kind of condition which is not quite good looking 
  or it may throw error in some cases for to handle these kind of cases 
  we use dummy node because in dummy node approach we have one extra 
  node only for handling these kind of cases (done in lower example)
  */
  if (current && current.val === val) {
    head = current.next;
  }
  return head;
}

// works with above code but have to get help extra condition
removeElementsBad(
  new ListNode(1, new ListNode(1, new ListNode(1, new ListNode(1)))),
  1
);

function removeElements(head: ListNode | null, val: number): ListNode | null {
  // Create a dummy node to handle cases where head needs to be removed
  const dummy = new ListNode(0, head);
  let current = dummy; // this works like a pointer on the dummy list

  // Traverse through the list
  while (current && current.next !== null) {
    if (current.next.val === val) {
      // Remove the node by skipping the current.next
      current.next = current.next.next;
    } else {
      // Move to the next node if no match
      current = current.next;
    }
  }

  // Return the new head, which is dummy.next
  return dummy.next;
}

removeElements(
  new ListNode(
    1,
    new ListNode(
      2,
      new ListNode(
        6,
        new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))
      )
    )
  ),
  6
);

function searchInsert(nums: number[], target: number): number {
  // Handle the case where the array contains only one element
  if (nums.length === 1) {
    // If the target is less than or equal to the only element, return 0 (insert at the start)
    // Otherwise, return 1 (insert at the end)
    return target <= nums[0] ? 0 : 1;
  }

  // Binary search approach for sorted arrays
  let left = 0;
  let right = nums.length - 1;

  // Continue the search while left <= right (inclusive)
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (nums[middle] === target) {
      // If the target is found, return its index
      return middle;
    } else if (target > nums[middle]) {
      // If the target is greater, move the left pointer to the right of middle
      left = middle + 1;
    } else {
      // If the target is smaller, move the right pointer to the left of middle
      right = middle - 1;
    }
  }

  // If we exit the loop, the target was not found. The correct insert position is the left pointer.
  // It gives the index where the target would be inserted to maintain the sorted order.
  return left;
}

searchInsert([1, 3, 5, 6], 5); // 2
searchInsert([1, 3, 5, 6], 2); // 1
searchInsert([1, 3, 5, 6], 0); // 0

function removeDuplicates(nums: number[]): number {
  // If the array has 0 or 1 elements, it's already unique
  if (nums.length === 0) return 0;

  // Initialize a pointer for the position of the next unique element
  let i = 0;

  // Iterate through the array using a second pointer j
  for (let j = 1; j < nums.length; j++) {
    // If the current element is different from the last unique element
    if (nums[j] !== nums[i]) {
      // Increment i and place the new unique element at the next position
      i++;
      nums[i] = nums[j];
    }
  }

  // The number of unique elements is i + 1 (since i is 0-based)
  return i + 1;
}
console.log(removeDuplicates([1, 1, 2, 2, 3, 4, 4, 5])); // Output: 5  [1, 2, 3, 4, 5, ..., ...]

/*
Prime factors are the building blocks of a number. They are the prime 
numbers (numbers that can only be divided by 1 and themselves) that 
multiply together to create the original number.

For example:

The prime factors of 12 are 2 and 3 because 2 × 2 × 3 = 12.
In simple terms, prime factors are the smallest numbers that, when 
multiplied, make up your number.
*/

/**
 * Function to determine if a number is an "ugly" number.
 * Ugly numbers are positive numbers whose prime factors are limited to 2, 3, and 5.
 *
 * @param {number} n - The number to be checked if it's ugly.
 * @returns {boolean} - Returns `true` if the number is ugly, otherwise `false`.
 */
function isUgly(n: number): boolean {
  // Step 1: Check if the number is non-positive (0 or negative numbers)
  // Ugly numbers are defined to be positive, so return false if n <= 0
  if (n <= 0) return false;

  // Step 2: Continuously divide the number by 2, 3, or 5 if divisible by any of these
  // The loop will terminate when n becomes 1 or is no longer divisible by 2, 3, or 5
  while (n > 1) {
    if (n % 2 === 0) {
      // If n is divisible by 2, divide it by 2
      n = n / 2;
    } else if (n % 3 === 0) {
      // If n is divisible by 3, divide it by 3
      n = n / 3;
    } else if (n % 5 === 0) {
      // If n is divisible by 5, divide it by 5
      n = n / 5;
    } else {
      // If n is not divisible by 2, 3, or 5, it's not an ugly number
      return false;
    }
  }

  // Step 3: If the loop finishes and n equals 1, return true (it's an ugly number)
  // If n is reduced to 1, it means the original n was only divisible by 2, 3, or 5
  return n === 1;
}

isUgly(20);
// 20 -> 2 * 10
/* 10 -> 2 * 5 prime factors are (2, 2, 5) since the factors are in 
provided question so 2, 2, 5 so the number is ugly
*/
isUgly(14);
isUgly(6);

function lengthOfLastWord(s: string): number {
  let length = 0; // Variable to store the length of the last word
  let i = s.length - 1; // Start from the end of the string

  // Step 1: Skip any trailing spaces
  while (i >= 0 && s[i] === " ") {
    i--;
  }

  // Step 2: Count the length of the last word
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }

  return length;
}

// Example Usage:
console.log(lengthOfLastWord("Hello World")); // Output: 5
console.log(lengthOfLastWord("   fly me   to   the moon  ")); // Output: 4
console.log(lengthOfLastWord("luffy is still joyboy")); // Output: 6

/**
 * Removes all instances of `val` from the array `nums` and returns the new length.
 *
 * This function modifies the array in-place by shifting non-val elements towards the beginning of the array.
 * The order of the remaining elements can be changed, and elements beyond the new length are irrelevant.
 *
 * @param {number[]} nums - Array of numbers from which `val` needs to be removed.
 * @param {number} val - The value to be removed from the array.
 * @returns {number} - The new length of the array after removing all occurrences of `val`.
 */
function removeElement(nums: number[], val: number): number {
  // `i` represents the position where the next non-val element should be placed.
  let i = 0;

  // Iterate through each element of the array with index `j`.
  for (let j = 0; j < nums.length; j++) {
    // If the current element is not equal to `val`, it should be kept.
    if (nums[j] !== val) {
      // Place the current non-val element at the `i` position.
      nums[i] = nums[j];

      // Increment `i` to prepare for the next non-val element.
      i++;
    }

    // If the element is equal to `val`, it is skipped and not placed in the array.
  }

  // At the end of the loop, `i` will be the new length of the array without `val` elements.
  return i;
}

// Example Usage:
let len1 = removeElement([3, 2, 2, 3], 3);
console.log(`New length after removal: ${len1}`); // Output: 2
console.log(`Modified array: ${[3, 2, 2, 3].slice(0, len1)}`); // Output: [2, 2]

let nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
let len2 = removeElement(nums2, 2);
console.log(`New length after removal: ${len2}`); // Output: 5
console.log(`Modified array: ${nums2.slice(0, len2)}`); // Output: [0, 1, 3, 0, 4]

/**
 * Counts the number of unique email addresses after normalizing them.
 *
 * Normalization steps:
 * 1. Any portion of the email local name after the '+' sign is ignored.
 * 2. Periods ('.') in the local name are ignored.
 * 3. The domain name remains unchanged.
 *
 * For example, "test.email+alex@leetcode.com" and "testemail@leetcode.com"
 * will be considered the same unique email.
 *
 * @param {string[]} emails - An array of email addresses.
 * @returns {number} - The count of unique email addresses after normalization.
 */
function numUniqueEmails(emails: string[]): number {
  const uniqueEmails = new Set<string>(); // A set to store unique email addresses

  // Loop through each email in the input array
  for (const email of emails) {
    // Step 1: Split the email into local and domain parts based on '@'
    let [local, domain] = email.split("@");

    // Step 2: Ignore everything after the '+' in the local part
    local = local.split("+")[0];

    // Step 3: Remove all periods ('.') from the local part
    local = local.replace(/\./g, "");

    // Step 4: Reconstruct the email as "local@domain" and add it to the set
    uniqueEmails.add(`${local}@${domain}`);
  }

  // The size of the set represents the number of unique email addresses
  return uniqueEmails.size;
}

// Example Usage:
const emails1 = [
  "test.email+alex@leetcode.com",
  "test.e.mail+bob.cathy@leetcode.com",
  "testemail+david@lee.tcode.com",
];

const emails2 = ["a@leetcode.com", "b@leetcode.com", "c@leetcode.com"];

console.log(numUniqueEmails(emails1)); // Output: 2
console.log(numUniqueEmails(emails2)); // Output: 3

/**
 * Brute force solution to calculate the minimum cost to reach the top.
 *
 * @param cost - Array of costs for each step.
 * @returns {number} - Minimum cost to reach the top.
 */
function minCostClimbingStairsBrute(cost: number[]): number {
  const n = cost.length;

  // Helper function to recursively calculate the cost to reach step i
  function findMinCost(i: number): number {
    // Base cases: if i is beyond or at the last step
    if (i >= n) return 0;

    // Recursive calculation for the cost of reaching step i
    return cost[i] + Math.min(findMinCost(i + 1), findMinCost(i + 2));
  }

  // You can either start from step 0 or step 1
  return Math.min(findMinCost(0), findMinCost(1));
}

// Example usage:
const costBrute = [10, 15, 20];
console.log(minCostClimbingStairsBrute(costBrute)); // Output: 15

/**
 * Memoization solution to calculate the minimum cost to reach the top.
 *
 * @param cost - Array of costs for each step.
 * @returns {number} - Minimum cost to reach the top.
 */
function minCostClimbingStairsMemo(cost: number[]): number {
  const n = cost.length;
  const memo: number[] = new Array(n).fill(-1); // To store already computed costs

  // Helper function to calculate the cost of reaching step i
  function findMinCost(i: number): number {
    // Base case: If we are at or beyond the last step
    if (i >= n) return 0;

    // If the result is already computed, return it
    if (memo[i] !== -1) return memo[i];

    // Recursive computation and store the result in memo array
    memo[i] = cost[i] + Math.min(findMinCost(i + 1), findMinCost(i + 2));
    return memo[i];
  }

  // Start from either step 0 or step 1
  return Math.min(findMinCost(0), findMinCost(1));
}

// Example usage:
const costMemo = [10, 15, 20];
console.log(minCostClimbingStairsMemo(costMemo)); // Output: 15

/**
 * Dynamic programming solution to calculate the minimum cost to reach the top.
 *
 * @param cost - Array of costs for each step.
 * @returns {number} - Minimum cost to reach the top.
 */
function minCostClimbingStairsDP(cost: number[]): number {
  const n = cost.length;
  const dp: number[] = new Array(n + 1).fill(0); // Array to store minimum cost to reach each step

  // Base cases: Starting from step 0 or step 1 has no initial cost
  dp[0] = 0;
  dp[1] = 0;
  /*
  in this approach we are basically running a window on same size on each 
  iteration we are moving one step forward ahead and adding and storing 
  min among the previous two indexes of dp and input array
  */

  // Fill the dp array with the minimum cost for each step
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }

  // The last entry dp[n] gives the minimum cost to reach the top
  return dp[n];
}

// Example usage:
const costDP = [10, 15, 20];
console.log(minCostClimbingStairsDP(costDP)); // Output: 15

/**
 * Function to calculate the Hamming weight (number of 1 bits) of a given integer.
 *
 * @param n - The input number whose Hamming weight is to be calculated.
 * @returns The Hamming weight (number of 1 bits) of the input number.
 */
function hammingWeight(n: number): number {
  // Initialize a variable 'count' to store the number of 1 bits found in 'n'.
  let count = 0;
  /* Subtracting 1 from n: When you subtract 1 from a binary number, it affects the 
    least significant 1 (LEASE SIGNIFICANT 1 BIT) bit and all bits to the right of it. For example:

    If n = 12 (which is 1100 in binary), then n - 1 = 11 (which is 1011 in binary).
    Here’s the key observation: the operation will flip the least significant 1 bit 
    of n to 0 and all bits to the right of it will become 1. Thus:
        Before: n = 1100
        After n - 1: n - 1 = 1011
        Now, applying n & (n - 1):
            1100 & 1011 = 1000 (the least significant 1 bit is cleared).

    As a result, each time you perform n &= (n - 1), you effectively remove one 1 bit from n.
  */

  // Continue looping until 'n' becomes 0.
  while (n > 0) {
    // This operation clears the least significant 1 bit from 'n'.
    // The expression 'n & (n - 1)' takes 'n' and subtracts 1 from it.
    // The result has all bits unchanged up to the least significant 1 bit.
    // The least significant 1 bit in 'n' becomes 0 after this operation.
    n &= n - 1;

    // Each time we perform the above operation, we have found a 1 bit.
    // Increment the count of 1 bits.
    count += 1;
  }

  // After all bits are processed and 'n' is reduced to 0,
  // return the total count of 1 bits found in the original number.
  return count;
}

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // If subRoot is null, it's always a subtree
  if (!subRoot) return true;

  // If root is null but subRoot isn't, it's not a subtree
  if (!root) return false;

  // Helper function to check if two trees are identical
  const isSameTree = (
    node1: TreeNode | null,
    node2: TreeNode | null
  ): boolean => {
    if (!node1 && !node2) return true; // Both trees are empty
    if (!node1 || !node2) return false; // One tree is empty, the other isn't

    // Check if current nodes are identical and recurse on both left and right subtrees
    return (
      node1.val === node2.val &&
      isSameTree(node1.left, node2.left) &&
      isSameTree(node1.right, node2.right)
    );
  };

  // Recursive check: if the current tree matches, return true
  // Otherwise, check the left and right subtrees
  return (
    isSameTree(root, subRoot) ||
    isSubtree(root.left, subRoot) ||
    isSubtree(root.right, subRoot)
  );
}

function isPalindrome(s: string): boolean {
  // Remove non-alphanumeric characters and convert to lowercase
  const aNString = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Loop to check if the string is a palindrome
  for (let i = 0; i < Math.floor(aNString.length / 2); i++) {
    // Compare characters from both ends
    if (aNString[i] !== aNString[aNString.length - 1 - i]) {
      return false; // Not a palindrome
    }
  }

  return true; // String is a palindrome
}

// Example usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Output: true
console.log(isPalindrome("race a car")); // Output: false

function isIsomorphic(s: string, t: string): boolean {
  if (s.length !== t.length) return false; // Strings of different lengths can't be isomorphic

  const mapST = new Map<string, string>(); // Map for s -> t
  const mapTS = new Map<string, string>(); // Map for t -> s

  for (let i = 0; i < s.length; i++) {
    const sChar = s[i];
    const tChar = t[i];

    // Check s -> t mapping
    if (mapST.has(sChar)) {
      if (mapST.get(sChar) !== tChar) {
        return false; // Mismatch in expected mapping
      }
    } else {
      mapST.set(sChar, tChar);
    }

    // Check t -> s mapping (to ensure one-to-one correspondence)
    if (mapTS.has(tChar)) {
      if (mapTS.get(tChar) !== sChar) {
        return false; // Mismatch in reverse mapping
      }
    } else {
      mapTS.set(tChar, sChar);
    }
  }

  return true; // Strings are isomorphic
}

// Example usage:
console.log(isIsomorphic("egg", "add")); // Output: true
console.log(isIsomorphic("foo", "bar")); // Output: false
console.log(isIsomorphic("paper", "title")); // Output: true
