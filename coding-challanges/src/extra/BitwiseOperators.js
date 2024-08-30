// ReadPermission = 00000100
// WritePermission = 00000010
// ExecutePermission = 00000001
const readPermission = 4; //00000100
const writePermission = 2; //00000010
const executePermission = 1; //00000001

let permission = 0; // 00000000

// (|) means addition
// (&) means multiplication
permission = permission & readPermission & writePermission & executePermission; // 7(decimal) //00000111

const message = permission & readPermission ? 'Yes' : 'no'; // no (yes when use |)
console.log({ message });

// Checking for set bits (sets bits and then compare it)

// 34(decimal) => 100010(binary)
// 50(decimal) => 110010(binary)
const mask1 = 0b10000; // check if 4th bit is set or not

// Check for 34
console.log({ 34: (34 & mask1) === mask1 }); // false
// means
// (34 & mask1) => (100010 & 010000) = 000000

// console.log(000000 === mask1); // false

// Check for 50
console.log({ 50: (50 & mask1) === mask1 }); // true
// means
// (50 & mask1) => (110010 & 010000) = 010000

// console.log(010000 === 010000); // true

// Check for 60
console.log({ 60: (60 & mask1) === mask1 }); // true
// means
// (60 & mask1) => (111100 & 010000) = 010000

// console.log(010000 === 010000); // true

// Used to check if the number is even or odd
// i think that there is always a 0 at the end of every even binary numbers and 1 at every odd numbers
const isEven = (num) => (num & 1) /* same as 0b000001 */ === 0;
// 00000100 & 00000001
console.log({ isEven: isEven(4) }); // true
const isOdd = (num) => (num & 1) /* same as 0b000001 */ === 1;
// 00000101 & 00000001
console.log({ isOdd: isOdd(5) }); // true

// Reference link : https://blog.logrocket.com/guide-javascript-bitwise-operators/#bitwise-not

// *********Bitwise Not (~) operator*********
// 32-bits

// 170 => 00000000000000000000000010101010
// --------------------------------------
//  ~ 00000000000000000000000010101010
// --------------------------------------
//  = 11111111111111111111111101010101
// --------------------------------------
//  = -171 (decimal)
//Formula:  -(A + 1)
// ~170 => -(170 + 1) => -171

console.log(~170); // -171

function foundIndex(index) { // -1 = 1111 so if we negate it (apply not operator) it will become 0000
  // this function is just used to convert into boolean expression
  return Boolean(~index);
}

// In the above code snippet, the ~ operator, when used on -1, evaluates to 0, which is a falsy value. Hence, using Boolean() to cast a falsy value will return false. For every other index value, true is returned because in JavaScript any non-zero value (even negative numbers) is truthy.

const numbers = [1, 3, 5, 7, 9];

console.log(foundIndex(numbers.indexOf(5))); // true
console.log(foundIndex(numbers.indexOf(8))); // false

// *********Bitwise AND(&) operator*********

// (0 & 0) === 0     // 0 x 0 = 0
// (0 & 1) === 0     // 0 x 1 = 0
// (1 & 0) === 0     // 1 x 0 = 0
// (1 & 1) === 1     // 1 x 1 = 1

// (A & 0 = 0) – the bit is always turned off by a corresponding 0 bit
// (A & 1 = A) – the bit remains unchanged when paired with a corresponding 1 bit

// First, create a bit mask whose effect will be to turn off the first 4 bits of an 8-bit integer.
// That bit mask will be 0b11110000. Note that the first 4 bits of the bit mask are set to 0,
// while every other bit is set to 1
// Next, perform an & operation using the 8-bit integer and the created bit mask:

const mask = 0b11110000; // 222 => 11011110// (222 & mask)
// ------------
//   11011110
// & 11110000
// ------------
// = 11010000
// ------------
// = 208 (decimal)console.log(222 & mask); // 208

// ***********Checking for set bits*********

// First, create a bit mask that will be used to check whether the target bits (fifth bit, in this case) are set to 1.
// Every bit on the bit mask is set to 0 except the bits at the target positions, which are set to 1.
// The binary number literal can be used to easily achieve this:
const mask2 = 0b10000;
// Next, perform an & operation using the decimal number and the bit mask as operands,
// and compare the result with the bit mask. If all the target bits are set for the decimal number,
// the result of the & operation will be equal to the bit mask.
// Note that the 0 bits in the bit mask will effectively turn off the corresponding bits in the decimal number, because A & 0 = 0:
// 34 => 100010
// (34 & mask2) => (100010 & 010000) = 000000
console.log((34 & mask2) === mask2); // false// 50 => 110010
// (50 & mask2) => (110010 & 010000) = 010000
console.log((50 & mask2) === mask2); // true

// *******Useful identities*******

// (A & 0) === 0
// (A & ~A) === 0
// (A & A) === A
// (A & -1) === A (since -1 === 111111) irrespective the number of bits on right hand side

// *********** Bitwise OR (|) operator ***********

// ********Turning on bits********

// (A | 0 = A) — The bit remains unchanged when paired with a corresponding 0 bit
// (A | 1 = 1) — The bit is always turned on by a corresponding 1 bit

// For example, say we have an 8-bit integer and we want to ensure
// that all the even-position bits (second, fourth, sixth, eighth)
// are turned on (set to 1). The | operator can be used to achieve this as follows:

const mask3 = 0b10101010; // 208 => 11010000// (208 | mask)

// ------------
// 11010000
// | 10101010
// ------------
// = 11111010
// ------------
// = 250 (decimal)console.log(208 | mask); // 250

// ********Useful identities********

// (A | 0) === A
// (A | ~A) === -1   (since -1 === 111111) irrespective the number of bits on right hand side
// (A | A) === A
// (A | -1) === -1

// *************** Bitwise XOR operator ***************

// *************** Toggling bits ***************

// The bit remains unchanged when paired with a corresponding 0 bit, e.g.
// (A ^ 0 = A)

// The bit is always toggled when paired with a corresponding 1 bit:
// (A ^ 1 = 1) — if A is 0
// (A ^ 1 = 0) — if A is 1
// (A ^ 1 = ~A)

// For example, say we have an 8-bit integer and we want to ensure that every bit is toggled except the least significant (first) and most significant (eighth) bits. The ^ operator can be used to achieve this as follows:

// First, create a bit mask whose effect will be to toggle every bit of an 8-bit integer except the least significant and most significant bits. That bit mask will be 0b01111110. Note that the bits to be toggled are set to 1, while every other bit is set to 0
// Next, perform an ^ operation using the 8-bit integer and the created bit mask:

const mask4 = 0b01111110; // 208 => 11010000// (208 ^ mask)
// ------------
//   11010000
// ^ 01111110
// ------------
// = 10101110
// ------------
// = 174 (decimal)console.log(208 ^ mask); // 174

// ******* Useful identities *******

// (A ^ 0) === A
// (A ^ ~A) === -1
// (A ^ A) === 0
// (A ^ -1) === ~A

// From the identities listed above, it is evident that an XOR operation on A and -1 is equivalent to a NOT operation on A. This means the foundIndex() function from before can also be written like:

function foundIndex(index) {
  return Boolean(index ^ -1);
}

// this will toggle the bits  -1 === 1111 by toggling 1111 result in 0000

// let's say the found index is 2 for number 5 in an array
// Performing the bitwise XOR operation: (index = 2) 0010 ^ 1111 results in 1101, which is 13 in decimal
// The Boolean() function converts 13 to true, which is then printed to the console.

// Performing the bitwise XOR operation: (index = -1) 1111 ^ 1111 results in 0000, which is 0 in decimal.
// The Boolean() function converts 0 to false, which is then printed to the console.

// ************ Bitwise Left Shift (<<) operator ************

// The left shift (<<) operator takes two operands. The first operand is an integer, while the second operand is the number of bits of the first operand to be shifted to the left. Zero (0) bits are shifted in from the right, while the excess bits that have been shifted off to the left are discarded.

// 170 => 00000000000000000000000010101010

// 170 << 3
// --------------------------------------------
//    (000)00000000000000000000010101010(***)
// --------------------------------------------
//  = (***)00000000000000000000010101010(000)
// --------------------------------------------
//  = 00000000000000000000010101010000
// --------------------------------------------
//  = 1360 (decimal)

console.log(170 << 3); // 1360

// The left shift bitwise operator (<<) can be defined using the following JavaScript expressions:

// (A << B) => A * (2 ** B) => A * Math.pow(2, B)

// Hence, looking back at the previous example:

// (170 << 3) => 170 * (2 ** 3) => 170 * 8 => 1360

// ********* Color conversion: RGB to hex *********

// 0 => 0b00000000 (binary) => 0x00 (hexadecimal)  (minimum value)
// 255 => 0b11111111 (binary) => 0xff (hexadecimal) (maximum value)

// Thus, the color itself can be perfectly represented by 24 bits (8 bits each for red, green, and blue components). The first 8 bits starting from the right will represent the blue component, the next 8 bits will represent the green component, and the 8 bits after that will represent the red component:

// (binary) => 11111111 00100011 00010100

//------------------>/* hex  decimal */
// (red) => 11111111 => ff => 255
// (green) => 00100011 => 23 => 35
// (blue) => 00010100 => 14 => 20

// (hex) => ff2314

// Now that we understand how to represent the color as a 24-bit sequence, let’s see how we can compose the 24 bits of the color from the values of the color’s individual components. Let’s say we have a color represented by rgb(255, 35, 20). Here is how we can compose the bits:

// (red) => 255 => 00000000 00000000 00000000 11111111
// (green) =>  35 => 00000000 00000000 00000000 00100011
//  (blue) =>  20 => 00000000 00000000 00000000 00010100

// Rearrange the component bits and pad with zeroes as necessary
// Use the left shift operator

// (red << 16) => 00000000 11111111 00000000 00000000
// (green << 8) => 00000000 00000000 00100011 00000000
// (blue) => 00000000 00000000 00000000 00010100

// Combine the component bits together using the OR (|) operator
// ( red << 16 | green << 8 | blue )

//   00000000 11111111 00000000 00000000
// | 00000000 00000000 00100011 00000000
// | 00000000 00000000 00000000 00010100
// -----------------------------------------
//   00000000 11111111 00100011 00010100
// -----------------------------------------

// Now that the procedure is pretty clear, here is a simple function that takes the RGB values of a color as an input array and returns the corresponding hexadecimal representation of the color based on the above procedure:

function rgbToHex([red = 0, green = 0, blue = 0] = []) {
  return `#${((red << 16) | (green << 8) | blue).toString(16)}`;
}

// ********** Bitwise Right Shift (>>) Operator **********

// The excess bits that have been shifted off to the right are discarded, whereas copies of the sign bit (leftmost bit) are shifted in from the left. As a result, the sign of the integer is always preserved, hence the name sign-propagating right shift.

//  170 => 00000000000000000000000010101010
// -170 => 11111111111111111111111101010110

// 170 >> 3
// --------------------------------------------
//    (***)00000000000000000000000010101(010)
// --------------------------------------------
//  = (000)00000000000000000000000010101(***)
// --------------------------------------------
//  = 00000000000000000000000000010101
// --------------------------------------------
//  = 21 (decimal)

// -170 >> 3
// --------------------------------------------
//    (***)11111111111111111111111101010(110)
// --------------------------------------------
//  = (111)11111111111111111111111101010(***)
// --------------------------------------------
//  = 11111111111111111111111111101010
// --------------------------------------------
//  = -22 (decimal)

console.log(170 >> 3); // 21
console.log(-170 >> 3); // -22

// (A >> B) => Math.floor(A / (2 ** B)) => Math.floor(A / Math.pow(2, B))
// Thus, looking back at the previous example:

// (170 >> 3) => Math.floor(170 / (2 ** 3)) => Math.floor(170 / 8) => 21
// (-170 >> 3) => Math.floor(-170 / (2 ** 3)) => Math.floor(-170 / 8) => -22

// ********* Color extraction *********

const intoHex = (n) => {
  return n.toString(16);
};

function rgbToHex([red = 0, green = 0, blue = 0] = []) {
  return `#${((red << 16) | (green << 8) | blue).toString(16)}`;
}

// console.log(255<<16 | 35<<8 | 20)
// console.log(rgbToHex([255,35,20]))

const colorInBinary = 0b00000000_11111111_00100011_00010100; // 32-bit binary color
const redBinary = colorInBinary >> 16;
const greenBinary = colorInBinary >> 8;
const blueBinary = colorInBinary >> 0;

const binaryMask = 0b00000000_00000000_00000000_11111111; // 32-bit binary mask
const hexMask = 0xff; // hex mask which is equivalent to binaryMask

// console.log((redBinary & hexMask).toString(16))
// console.log(greenBinary & hexMask)
// console.log(blueBinary & hexMask)

const hexIntoRGB = (hexColor) => {
  const hexString = hexColor.replace(/^#?([0-9a-f]{6})$/i, '$1'); // extract the color and return it (ff2314) $1 for 1st group and $2 for second group inside parentheses () is the group (e.g = ([0-9a-f]{6}))
  const decimal = Number(`0x${hexString}`); // converting hex into decimal number
  const hexMask = 0xff; // hex mask which is equivalent to binaryMask we can use either hexMask or binaryMask
  // after we have to perform and (&) operation with mask so that unnecessary bits are turned off
  const red = (decimal >> 16) & hexMask;
  const green = (decimal >> 8) & hexMask;
  const blue = (decimal >> 0) & hexMask;

  return `rgb(${red}, ${green}, ${blue})`;
};

console.log(hexIntoRGB('#ff2314'));
