# TypeScript Basics

- download via `npm install -g typescript`
- type checking at compile time, whereas JavaScript only gets type errors at run time
- `tsc [filename.ts]` to compile specific file
- `tsc [filename.ts] --watch` compile specific file in watch mode (re-compiles every time after file changes)
- `tsc --init` will create `tsconfig.json` where we can configure how to compile our files.
- after `tsconfig.json` is set up, you can simply run `tsc` (or `tsc -w` with watch mode) to compile your whole project
- `include` or `exclude` files or directories for compilation (as an array) in `tsconfig.json` after the `"compilerOptions"`
- use the directories `src` (typescript files) and `dist` (javascript files) for bigger projects. Specify these in `rootDir` (input) and `outDir` (output) respectively in the `tsconfig.json` for the TypeScript compilation.

### TypeScript Type Check

```
function add(n1: number, n2: number)
```

_Note:_ The core primitive types in TypeScript are all lowercase!

### JavaScript Type Check

```
if (typeof n1 !== "number" || typeof n2 !== "number") {
    throw new Error("Incorrect input!");
    }
```

## Type Inference (implicit)

TypeScript assigns types by inference upon declaration of variable.

```
const num1 = 5;     // Type: 5
let num2 = 2.8;     // Type: number
```

## Type Assignment (explicit)

For unknown variables the type has to be assigned, so TypeScript knows what to expect.

```
let num1: number;
```

```
function add(
    n1: number,
    n2: number,
    showResult: boolean,
    phrase: string) {
    const result = n1 + n2;
    if (showResult === true){
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
```

## Object Types

Defining an object type with `object` or `{}` will not define the containing key-value pairs!

```
const person: object = {
  name: "Ria",
  age: 34,
};
```

```
const person: {} = {
  name: "Ria",
  age: 34,
};
```

Defining the object's specific key-value pair types, separated by `;`. However, it's better to do this by inference.

```
const person: {
  name: string;
  age: number;
} = {
  name: "Ria",
  age: 34,
};
```

```
const person = {
  name: "Ria",
  age: 34,
};
```

## Array Types

The `[]` after the type indicates that it is an array containing these types.

```
const hobbies: string[] = ["Yoga", "Swimming", "Coding"];
```

Union Types:

```
const labels: (string | number)[] = ["red", "green", 1];
```

## Tuples

When TypeScript's Inference is not enough, we need to explicitely set the type.

E.g. `role` would be inferred as a simple `(number | string)[]` but if we want it to always only contain a number and a string (in that order), we need to explicitely declare it.

```
const role: [number, string] = [2, "admin"];
```

## Enums

Type only available in TypeScript. By default assigns numbers (from 0) to given labels. These properties can be accessed and assigned via dot notation. Enums are usually declared in uppercase.

```
enum ROLES { ADMIN, READ_ONLY, VIEWER }

console.log(ROLES.ADMIN === 0); // true
```

Will be compiled in JavaScript as below:

```
var ROLES;
(function (ROLES) {
    ROLES[ROLES["ADMIN"] = 0] = "ADMIN";
    ROLES[ROLES["READ_ONLY"] = 1] = "READ_ONLY";
    ROLES[ROLES["VIEWER"] = 2] = "VIEWER";
})(ROLES || (ROLES = {}));
```

This is different for strings though or other definitions

```
enum ROLES {
  ADMIN = "admin",
  READ_ONLY = "read-only",
  VIEWER = 100,
}
```

```
var ROLES;
(function (ROLES) {
    ROLES["ADMIN"] = "admin";
    ROLES["READ_ONLY"] = "read-only";
    ROLES["VIEWER"] = "viewer";
})(ROLES || (ROLES = {}));
```

## Type Aliases

create your own type with any definition (usually using type unions). Type Aliases are usually declared in Title case.

```
type MyOwnTypeAlias = number | string;
let numberOrString: MyOwnTypeAlias;
type YesOrNo = "yes" | "no";
let gameOver: YesOrNo;
```

Type Aliases are not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.

```
type User = { name: string; age: number };

function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```

## Function Types

In general it is best left to TypeScript to infer the type that is returned from a function. The return type `: void` indicates the function does not return anything (`return` keyword is not used). The type `: undefined` can be used when the function has a `return` statement but no value.
e.g.

```
function printEach(arr: number[]): void {
  arr.forEach((num) => console.log(num));
}

function printEach2(arr: number[]): undefined {
  arr.forEach((num) => console.log(num));
  return;
}
```

Use `: Function` type when a variable is only to be declared for a (any) function.

```
let combineValues: Function;
combineValues = addition;
combineValues = 88; // this will throw a compile time error because it cannot be assigned to a number!
console.log(combineValues(8, 8));
```

Create a function type instead to be more specific about what parameters and return values the function should have.

```
let combineValues: () => number; // defines a function that has no parameters and returns a number

let combineValues: (x: number, y: number) => string; // defines a function that has two parameters of type number and returns a string
```

Use Function Type definition for callback functions as well.

```
function addAndHandle(n1: number, n2: number, cb: (res: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => console.log(result)); // cb is invoked with the result with type checking
addAndHandle(10, 20, (result, b) => console.log(result)); // throws compile time error because only one parameter is expected
```

Setting a return value of `void` will ignore any returned values from the callback. It is simply indicating that the possible return value may not be used.

If the callback function should be prohibited from returning anything, use `undefined`.

```
function addAndHandle(n1: number, n2: number, cb: (res: number) => undefined) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  return result;
}); // throws error when function type is defined to return undefined!
```

### `never`

When a function does not return `undefined` and should never return any value. For example for utility functions that throw errors.

```
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError("An error occurred!", 500);
```

## Types - Recap

| Type                                  | Description                                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `string`                              | strings                                                                                                                               |
| `number`                              | numbers                                                                                                                               |
| `boolean`                             | booleans                                                                                                                              |
| `object`                              | or `{}`                                                                                                                               |
| `[]`                                  | arrays, e.g. ` number[]` is array of numbers                                                                                          |
| `[number, string]`                    | Tuple - explicit type (amount and order is set)                                                                                       |
| `enum`                                | Typename and properties usually go in upper case                                                                                      |
| `string \| boolean`                   | Union types                                                                                                                           |
| `'as-text' \| 'as-number'`            | Literal types                                                                                                                         |
| `type`                                | Use this to define your own custom type!                                                                                              |
| `Function`                            | Set type as ANY function                                                                                                              |
| `void`                                | Set as return type for a function to ignore any return values                                                                         |
| `undefined`                           | Set as return type for a function to prevent it from returning anything.                                                              |
| `never`                               | Set as return type for a function which does not return `undefined` either.                                                           |
| `callback: (input: number) => number` | Define concrete function parameters and return types                                                                                  |
| `unknown`                             | This type basically tells TypeScript that type checking will be done later at some point via JavaScript (some form of `typeof` check) |
| `any`                                 | Disables type checking                                                                                                                |
