/**

Given an array arr of integers, check if there exist two indices i and j such that :

i != j
0 <= i, j < arr.length
arr[i] == 2 * arr[j]
 

Example 1:

Input: arr = [10,2,5,3]
Output: true
Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]
Example 2:

Input: arr = [3,1,7,11]
Output: false
Explanation: There is no i and j that satisfy the conditions.
 

Constraints:

2 <= arr.length <= 500
-103 <= arr[i] <= 103

 */

function checkIfExist(arr: number[]): boolean {
  if (arr.length === 0 || arr == null) {
    return false;
  }
  const doubles: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const double: number = arr[i] * 2;
    doubles.push(double);
  }
  console.log(doubles);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < doubles.length; j++) {
      if (arr[i] === doubles[j] && i != j) {
        return true;
      }
    }
  }
  return false;
}

// this works! Let's see what the performance is with .includes() !

function checkIfExist2(arr: number[]): boolean {
  if (arr.length === 0 || arr == null) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr.includes(arr[i] * 2) && arr.indexOf(arr[i] * 2) !== i) {
      return true;
    }
  }
  return false;
}

// other solution: (and what I learnt from it)

function checkIfExist3(arr: number[]): boolean {
  const map: Record<number, true> = {}; // hash table (lookup table) -> instead of working with indexes (arrays) we can work with key-value pairs for a quicker lookup!

  for (let i = 0; i < arr.length; i++) {
    const a = arr[i] / 2; // defines the half value we're looking for
    const b = arr[i] * 2; // defines the double value we're looking for

    if (map[a] || map[b]) {
      // checks hash map if we've seen the half or double value of i before (will be true instead of undefined)
      return true;
    }

    map[arr[i]] = true; // adds to hash map as record that we've looked at (can be either half or double value that may matches)
  }

  return false;
}

const myArray = [3, 1, 7, 11]; // false
const myArray2 = [10, 2, 5, 3]; // true
const myArray3 = [-2, 0, 10, -19, 4, 6, -8]; // false
const myArray4 = [0, 0]; // true

// console.time() + console.timeEnd()
// for loops: 3.869ms
// array iteration: 0.018ms
// hash map solution: 0.071ms
