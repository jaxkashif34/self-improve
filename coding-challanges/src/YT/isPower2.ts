export {};

// Detail Explanation Or all these methods: https://www.youtube.com/watch?v=4cqHahxFTYw
// Big-O (log2N)
const isPower2Recursion = (n: number): boolean => {
  if (n === 1) return true;
  if (n % 2 !== 0) return false; // if a number is divisible by 2 its remainder will be 0 and if the remainder is not 0 then it's not a power of 2 number (e.g 5 % 2 = 1) returning false here will save us from unnecessary recursion calls
  return isPower2Recursion(n / 2); // if the number is divisible by 2 then we will divide it by 2 and then we will call the same function again with the new number (e.g 16 / 2 = 8)
};

console.log(isPower2Recursion(5));

// check if the number is power of 2 by counting set bits in binary representation of n
// set bits means 1 in binary representation

// by using Right shift operator
// In this case we just have to observe that how many 1 are in binary form of that number if its more then 1 it's mean that is not a power of 2 number (e.g 16 = 10000 --> power of 2, 12 = 1100 --> no power of 2)
// Power of 2 number has only 1 set bit in binary representation which is the MSB (e.g 16 = 10000, 8 = 1000, 4 = 100, 2 = 10, 1 = 1)
// Big-O (log2N)
const isPower2ByCountingSetBits = (n: number) => {
  let count = 0;
  while (n > 0) {
    count += n & 1; // (n & 1) this will generate either 0 or 1 and then we are adding it to the count variable
    n >>= 1; // moving number towards right (decreasing number) and again assigning it to n
  }
  return count === 1;
};

// Explanation:
// 16 = 10000 (binary representation)
// 16 & 1 = 10000 & 00001 = 0
// 16 >> 1 = 10000 >> 1 = 1000
// 8 & 1 = 1000 & 0001 = 0
// 8 >> 1 = 1000 >> 1 = 100
// 4 & 1 = 100 & 0001 = 0
// 4 >> 1 = 100 >> 1 = 10
// 2 & 1 = 10 & 0001 = 0
// 2 >> 1 = 10 >> 1 = 1
// 1 & 1 = 1 & 0001 = 1
// 1 >> 1 = 1 >> 1 = 0
// count = 1
// return true

// 12 = 1100 (binary representation)
// 12 & 1 => 1100 & 0001 = 0
// 12 >> 1 => 1100 >> 1 = 110 (6)
// 6 & 1 => 110 & 0001 = 0
// 6 >> 1 => 110 >> 1 = 11 (3)
// 3 & 1 => 11 & 0001 = 1
// count = 1
// 3 >> 1 => 11 >> 1 = 1 (1)
// 1 && 1 => 1 & 1 = 1
// count = 2
// 1 >> 1 => 1 >> 1 = 0
// return false

// what we are doing here is first take a number like 16 and then we are checking if the last bit is 1 or not, if it is 1 then we are incrementing the count by 1 and then we are left shifting the number by 1, so that the last bit will be removed and then we are repeating the same process until the number (16) becomes 0.

// Big-O (log2N)
const isPower2ByBitShifting = (n: number) => {
  let count = 0; // put a debugger here if you want to see the detailed explanation in console
  let add = 1;
  while (add <= n) {
    count += n & add ? 1 : 0;
    add <<= 1; // by doing left shifting we are doubling the add variable by 2 (e.g 1 << 1 = 2, 2 << 1 = 4, 4 << 1 = 8, 8 << 1 = 16)
  }
  return count === 1;
};

// Explanation:
// 16 = 10000 (binary representation)
// 16 & 1 = 10000 & 00001 = 0 (false condition) (add noting to count)
// add(1) << 1 = 00001 << 1 = 00010 (2)
// 16 & 2 = 10000 & 00010 = 0 (false condition) (add noting to count)
// add(2) << 1 = 00010 << 1 = 00100 (4)
// 16 & 4 = 10000 & 00100 = 0 (false condition) (add noting to count)
// add(4) << 1 = 00100 << 1 = 01000 (8)
// 16 & 8 = 10000 & 01000 = 0 (false condition) (add noting to count)
// add(8) << 1 = 01000 << 1 = 10000 (16)
// 16 & 16 = 10000 & 10000 = 1 (true condition) (add 1 to count)
// add(16) << 1 = 10000 << 1 = 100000 (32)
// when add becomes greater then 16 loop will stop
// count = 1
// return true

// 12 = 1100 (binary representation)
// 12 & 1 => 1100 & 0001 = 0 (false condition) (add noting to count)
// add(1) << 1 = 00001 << 1 = 00010 (2)
// 12 & 2 => 1100 & 0010 = 0 (false condition) (add noting to count)
// add(2) << 1 = 00010 << 1 = 00100 (4)
// 12 & 4 => 1100 & 0100 = 4 (true condition) (add noting to count)
// add(4) << 1 = 00100 << 1 = 01000 (8)
// 12 & 8 => 1100 & 1000 = 8 (true condition) (add noting to count)
// add(8) << 1 = 01000 << 1 = 10000 (16)
// when add becomes greater then 12 loop will stop
// count = 2
// return false

// Explanation : https://youtu.be/4cqHahxFTYw?t=408
// Big-O : O(1)
const isPower2ByLog = (n: number) => {
  if (n < 1) return false;
  return Math.floor(Math.log2(n)) === Math.ceil(Math.log2(n));
};

console.log(isPower2ByLog(16));
// Big-O : O(1)
const isPower2ByAndOperator = (n: number) => {
  // if we take bitwise and (&) of a power-of-2-number with it's previous number result will always be 0 (e.g 16 & 15 = 0, 8 & 7 = 0, 4 & 3 = 0, 2 & 1 = 0)
  // Binary Representation
  // 4 = 100
  // 3 = 011
  // 4 & 3 = 000
  // 16 = 10000
  // 15 = 01111
  // 16 & 15 = 00000
  // if we take bitwise and (&) of a non-power-of-2-number with it's previous number result will never be 0 (e.g 12 & 11 = 8, 6 & 5 = 4, 3 & 2 = 2)
  // Binary Representation
  // 12 = 1100
  // 11 = 1011
  // 12 & 11 = 1000
  // 6 = 110
  // 5 = 101
  // 6 & 5 = 100
  if (n < 1) return false;
  return (n & (n - 1)) === 0;
};
