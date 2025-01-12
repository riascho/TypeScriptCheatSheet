/**
 * 
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
Note that you must do this in-place without making a copy of the array.

Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]

Constraints:
1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1

Follow up: Could you minimize the total number of operations done?

*/

const input1: number[] = [0, 1, 0, 3, 12];
const input2: number[] = [0];
const input3: number[] = [1, 0, 1];

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let nextNullIndex: number = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (i !== nextNullIndex) {
        // only swap if we have a zero index
        [nums[nextNullIndex], nums[i]] = [nums[i], nums[nextNullIndex]]; // Single swap, replaces the below
        //   const tracker = nums[i];
        //   nums[i] = 0;
        //   nums[nextNullIndex] = tracker;
      }
      nextNullIndex++;
    }
  }
}

moveZeroes(input1);
moveZeroes(input2);
moveZeroes(input3);

console.log(input1);
console.log(input2);
console.log(input3);
