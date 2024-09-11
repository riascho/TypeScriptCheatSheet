# TypeScript Basics

- download via `npm install -g typescript`
- type checking at compile time (run `tsc filename.js`) whereas JavaScript only gets type errors at run time

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

Type only available in TypeScript. By default assigns numbers (from 0) to given labels. These properties can be accessed and assigned via dot notation.

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

## Types - Recap

- `string`
- `number`
- `boolean`
- `object` or `{}`
- `[]` arrays (e.g. `(string | boolean)[]`)
- `[number, string]` tuple - explicit type (amount and order is set)
- `enum` usually in upper case
