/**
Given an array of integers arr, return true if and only if it is a valid mountain array.

Recall that arr is a mountain array if and only if:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Example 1:

Input: arr = [2,1]
Output: false
Example 2:

Input: arr = [3,5,5]
Output: false
Example 3:

Input: arr = [0,3,2,1]
Output: true

Constraints:

1 <= arr.length <= 104
0 <= arr[i] <= 104

 */

// My Brute Force Solution //

function validMountainArray(arr: number[]): boolean {
  let mountainPeakIndex: number = 0;

  // can't form a mountain
  if (arr.length < 3) {
    return false;
  }

  // check if it's ascending
  for (let i = 0; i < arr.length; i++) {
    // oh no it's flat =(
    if (arr[i] === arr[i + 1]) {
      return false;
    }

    // we've reached the top!
    if (arr[i] > arr[i + 1]) {
      mountainPeakIndex = i;

      // but doesn't count if it's at the beginning or the end of the hike
      if (mountainPeakIndex === arr.length - 1 || mountainPeakIndex === 0) {
        return false;
      }
      break;
    }
  }

  //   check if it's descending
  for (let j = arr.length - 1; j >= 0; j--) {
    if (arr[j] >= arr[j - 1] && j > mountainPeakIndex) {
      return false;
    }
  }
  return true;
}
