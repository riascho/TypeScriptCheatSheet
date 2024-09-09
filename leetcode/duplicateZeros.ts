/**
 Do not return anything, modify arr in-place instead.
 */

function duplicateZeros(arr: number[]): void {
  // loop forwards
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0 && i < arr.length - 1) {
      // loop backwards
      for (let j = arr.length - 1; j > i; j--) {
        // assign from left to right going backwards
        arr[j] = arr[j - 1];
      }
      arr[i + 1] = 0;
      i++; // jumping the next loop so not to repeat on the newly inserted zero
    }
  }
}

// using splice
function duplicateZeros2(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 0, 0);
      arr.pop();
      i++;
    }
  }
}

let arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
let arr2 = [1, 2, 3];
let arr3 = [0, 0, 0, 0];

console.time("looping");
duplicateZeros(arr1); // [1, 0, 0, 2, 3, 0, 0, 4]
duplicateZeros(arr2); // [1, 2, 3]
duplicateZeros(arr3); // [0, 0, 0, 0]

console.log(arr1);
console.log(arr2);
console.log(arr3);
console.timeEnd("looping"); // 2.66ms

arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
arr2 = [1, 2, 3];
arr3 = [0, 0, 0, 0];

console.time("splicing");
duplicateZeros2(arr1); // [1, 0, 0, 2, 3, 0, 0, 4]
duplicateZeros2(arr2); // [1, 2, 3]
duplicateZeros2(arr3); // [0, 0, 0, 0]

console.log(arr1);
console.log(arr2);
console.log(arr3);
console.timeEnd("splicing"); // 0.34ms
