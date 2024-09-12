console.log("Hello There!");

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  return n1 + n2;
}

const num1 = 5;
let num2 = 2.8;

const result = add(num1, num2, true, "Result is: ");

function combine(input1: number | string, input2: number | string) {
  // return input1 + input2; // gives TypeScript warning
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

console.log(combine(5, 6));
console.log(combine("Hello", " World"));

function combine2(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-number" | "as-text" // makes sure that only those two types are passed in
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2; // will return NAN if input1 or input2 is not a number string
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

console.log(combine2("30", "60", "as-number"));
console.log(combine2("Edward", "Erica", "as-number"));

type MyOwnTypeAlias = number | string;
let numberOrString: MyOwnTypeAlias;
type YesOrNo = "yes" | "no";
let gameOver: YesOrNo;
