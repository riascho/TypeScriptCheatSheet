/**
 * This function takes an array of heights and returns the number of indices
 * where the heights do not match the expected heights when sorted in ascending order.
 *
 * @param heights - An array of numbers representing the heights of students.
 * @returns The number of indices where the heights do not match the expected heights.
 */

function heightChecker(heights: number[]): number {
  const expected: number[] = heights.slice().sort((a, b) => a - b);
  let counter: number = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== expected[i]) {
      counter++;
    }
  }
  return counter;
}

console.log(heightChecker([1, 1, 4, 2, 1, 3]));

// LEARNINGS:
// Don't forget that .sort() mutates the original array. Need to use .slice() on the original array first to create a copy that can then be sorted.
