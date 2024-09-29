// declare array with length 10 but no elements

const arrayOfTen = new Array(10);
console.log(`This array has a length of ${arrayOfTen.length}\n${arrayOfTen}`);

const emptyArray: any[] = [];
console.log(`This array has a length of ${emptyArray.length}\n${emptyArray}`);

/**
Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:
Change the array nums such that the first k elements of nums contain the elements which are not equal to val. 
The remaining elements of nums are not important as well as the size of nums.
Return k.
 */

// My solution - not working :/
function myRemoveElement(nums: number[], val: number): number {
  let kCount = 0;
  let endIndex = nums.length - 1;
  for (let i = 0; i < endIndex; i++) {
    if (nums[i] === val) {
      kCount++;
      let value = nums[i];
      if (nums[endIndex] === val) {
        endIndex--;
        i--;
        continue;
      }
      nums[i] = nums[endIndex];
      nums[endIndex] = value;
      endIndex--;
    }
  }
  return kCount;
}

// Solution - helped me learn! :)
function removeElement(nums: number[], val: number): number {
  let pointer = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[pointer] = nums[i];
      pointer++;
    }
  }
  return pointer;
}

const nums = [0, 1, 2, 2, 3, 0, 4, 2];
console.log(removeElement(nums, 2));
console.log(nums); // [0, 1, 3, 0, 4, 0, 4, 2]
