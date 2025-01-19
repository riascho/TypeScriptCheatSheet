/**
 * 
 * @param nums 

Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.
Return any array that satisfies this condition.

Example 1:
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
Example 2:

Input: nums = [0]
Output: [0]

Constraints:
1 <= nums.length <= 5000
0 <= nums[i] <= 5000
 */

function sortArrayByParity(nums: number[]): number[] {
  if (nums.length < 2) {
    return nums;
  }
  const odds: number[] = [];
  const evens: number[] = [];
  nums.forEach((num) => {
    if (num % 2 === 0) {
      evens.push(num);
    } else {
      odds.push(num);
    }
  });
  return evens.concat(odds);
}

function sortArrayByParity2(nums: number[]): number[] {
  let evenPointer = 0;
  let oddPointer = nums.length - 1;
  while (evenPointer < oddPointer) {
    if (nums[evenPointer] % 2 === 0) {
      evenPointer++;
    } else if (nums[oddPointer] % 2 !== 0) {
      oddPointer--;
    } else {
      [nums[oddPointer], nums[evenPointer]] = [
        nums[evenPointer],
        nums[oddPointer],
      ];
      evenPointer++;
      oddPointer--;
    }
  }
  return nums;
}

console.log(sortArrayByParity2([0, 2, 1, 4]));
console.log(sortArrayByParity2([0]));
