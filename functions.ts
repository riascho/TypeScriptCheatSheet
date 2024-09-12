function addition(a: number, b: number) {
  return a.toString() + b.toString();
}

function printEach(arr: number[]): void {
  arr.forEach((num) => console.log(num));
}
function printEach2(arr: number[]): undefined {
  arr.forEach((num) => console.log(num));
  return;
}
printEach([1, 2, 3]);

let combineValues: Function; // when Function type is defined
let combineValues1: () => string; // defines a function that has no parameters and returns a number
let combineValues2: (x: number, y: number) => string; // defines a function that has two parameters of type number and returns a string

combineValues = addition;
// combineValues = 88; // throws a compile time error because it cannot be assigned to a number!
// combineValues2 = printEach; // throws a compile time error because printEach is not a function that returns a string
console.log(combineValues(8, 8));

function addAndHandle(n1: number, n2: number, cb: (res: number) => undefined) {
  // cb is defined as type function
  const result = n1 + n2;
  cb(result);
}
// addAndHandle(10, 20, (result) => console.log(result)); // cb is invoked with the result with type checking
// addAndHandle(10, 20, (result, b) => console.log(result)); // throws compile time error because only one parameter is expected
// addAndHandle(10, 20, (result) => {
//   return result;
// }); // throws error when function type is defined to return undefined!
