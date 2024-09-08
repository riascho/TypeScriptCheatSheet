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
