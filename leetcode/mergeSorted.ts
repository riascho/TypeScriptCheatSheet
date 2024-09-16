/**
 Do not return anything, modify nums1 in-place instead.
 */

const numbers = [1, 2, 3, 0, 0, 0];

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  nums1.splice(m, n, ...nums2);
  nums1.sort((a, b) => a - b);
}

merge(numbers, 3, [2, 5, 6], 3);

function mergeWithReturn(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): number[] {
  // returns deleted elements
  const deleted = nums1.splice(m, n, ...nums2); // .splice returns deleted elements
  nums1.sort((a, b) => a - b);
  return deleted;
}

/**
 * Hints: You can easily solve this problem if you simply think about two elements at a time rather than two arrays.
 * We know that each of the individual arrays is sorted. What we don't know is how they will intertwine.
 * Can we take a local decision and arrive at an optimal solution?
 * If you simply consider one element each at a time from the two arrays and make a decision and proceed accordingly, you will arrive at the optimal solution.
 */

const numbers2 = [0];
const mergers = [1];

function merge2(nums1: number[], m: number, nums2: number[], n: number): void {
  let loopIndex = m + n - 1;
  let nums1Index = m - 1;
  let nums2Index = n - 1;
  while (nums1Index >= 0 && nums2Index >= 0) {
    if (nums1[nums1Index] < nums2[nums2Index]) {
      nums1[loopIndex] = nums2[nums2Index];
      nums2Index--;
    } else {
      nums1[loopIndex] = nums1[nums1Index];
      nums1Index--;
    }
    loopIndex--;
  }
  while (nums2Index >= 0) {
    nums1[loopIndex] = nums2[nums2Index];
    nums2Index--;
    loopIndex--;
  }
}

merge2(numbers2, 0, mergers, 1);
console.log(numbers2);
