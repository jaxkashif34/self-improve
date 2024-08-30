const isPrime = (n: number) => {
  if (n <= 1) return false;
  // Helpful for understanding : http://mathandmultimedia.com/2012/06/02/determining-primes-through-square-root
  // https://stackoverflow.com/questions/5811151/why-do-we-check-up-to-the-square-root-of-a-number-to-determine-if-the-number-is
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) { // if n is prime then it will restrict from over iterations
    /* every composite (define below) number must has a factor (divisor) less than or equal to its square root 
    if a number not have one then the number must be a prime number.  Proving this is the same as proving that 
    a number that has no divisor greater than 1 and less than its square root is prime.*/
    /* Composite number: A composite number is a natural number or a positive integer which has more than two 
    factors. For example, 15 has factors 1, 3, 5 and 15, hence it is a composite number.*/
    if (n % i === 0) return false;
    /* if we want to know that if a number is divisible by any other number (devisor) 
    that it's reminder (modules) must be 0 because it proofs that number is completely divided by a divisor*/
  }
  return true;
};

// Execution Steps for 15
// 1. 15 % 2 === 0 ? No
// 2. 15 % 3 === 0 ? Yes

// Execution Steps for 17 (this will only runs 4 times because of Math.floor(Math.sqrt(n))
// 1. 17 % 2 === 1 ? No
// 2. 17 % 3 === 2 ? No
// 3. 17 % 4 === 1 ? No

// console.log(isPrime(100));

// print prime numbers with sieve of Eratosthenes

// Detailed Explanation of Sieve of Eratosthenes: https://youtu.be/nDPo9hsDNvU

const primeSieve = (n: number) => {
  // creating a hash map with n + 1 elements and filling it with 0
  const prime = new Array(n + 1).fill(0); // we are using n + 1 because we are using 1 based indexing

  for (let i = 2; i <= n; i++) {
    // outer loop starts from 2 (lowest prime number) to the n 50 in this case
    if (prime[i] === 0) {
      // condition to check if that element is not already marked by its previous multiplier  (e.g 4 is already marked by 2 we will run inner loop again) because inner loop will mark all the multiple of i

      for (let j = i * i; j <= n; j += i) {
        // inner loop starts from i * i (i square) because all the previous elements from the i * i are already marked by the previous multiple number (4 is marked by 2) and increment i into j so that it can jump to the next multiple of i and then mark it
        // (j += i) we are incrementing the value of j by i because we want to mark all the multiple of i
        // let's say i = 2 then first it will go and mark the 4 then it's time to increment the value of j by i so it will be 4 + 2 = 6 and then it will mark 6 and then increment the value of j by i so it will be 6 + 2 = 8 and then it will mark 8 and so on
        prime[j] = 1;
      }
    }
  }

  for (let i = 2; i <= n; i++) {
    if (prime[i] === 0) {
      console.log(i);
    }
  }
};

console.log(primeSieve(50));
