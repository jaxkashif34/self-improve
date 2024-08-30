const towerOfHanoi = (n: number, source: string, auxiliary: string, target: string) => {
  if (n === 1) return console.log(`Move disk ${n} from ${source} to ${target}`);

  towerOfHanoi(n - 1, source, target, auxiliary);

  console.log(`Move disk ${n} from ${source} to ${target}.`);

  towerOfHanoi(n - 1, auxiliary, source, target);
};

towerOfHanoi(3, 'A', 'B', 'C');

// Explanation :  https://www.youtube.com/watch?v=bLHxrvDvL_8&list=PLC3y8-rFHvwjPxNAKvZpdnsr41E0fCMMP&index=35
// middle one is helping tower
// always disk move from source to target
// at first recursion call source to auxiliary tower with the help of source tower
// then print Move disk ${n} from ${source} to ${target}
// at last recursion call pass disks from auxiliary to target with the help of source  
