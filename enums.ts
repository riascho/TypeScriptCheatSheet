// Creating enums in JavaScript for type safety

const APP_STATES = Object.freeze({
  RUNNING: "running",
  ON_HOLD: "on-hold",
  STOPPED: "stopped",
});

// Object.freeze -> freezes the object so that it cannot be modified

// const resumed = APP_STATES.RESUMED; // throws an error
// APP_STATES.STOPPED = "paused"; // throws an error

enum ROLES {
  ADMIN = "admin",
  READ_ONLY = "read-only",
  VIEWER = "viewer",
}

const person2 = {
  name: "Ria",
  age: 34,
  role: ROLES.ADMIN,
};

/**
"good" use case for enums is for being able to reference specific keys of an object when the keys occassionally pass through the realm of being a string.
In this example, we DO get type safety in access in getValue⁠, it will only allow ⁠x⁠ or y⁠.
However, we cannot accurately search for all instances where we care about key x⁠. If we right click ⁠x⁠ (of MyType) and do⁠ "find all references"⁠, it will NOT figure out that we called it with getValue.
*/

const myVar0: MyType = {
  x: "hi",
  y: 54,
};
const myVar1: MyType = {
  x: "Hiya",
  y: 67,
};

type MyType = {
  x: string; // will only show 3 references
  y: number;
};

const getValue0 = (keyToUse: keyof MyType) => {
  return myVar0[keyToUse];
};
const getValue1 = (keyToUse: keyof MyType) => {
  return myVar1[keyToUse];
};

console.log(getValue0("x"));
console.log(getValue1("x"));

/**
However, in this example, if we use an enum, though it makes our code a bit more verbose, we now do have a comprehensive understanding of where-all the ⁠ x ⁠ key is being used.
It serves as a way to track instance calls on that particular type. 
*/

const myVar2: MyType2 = {
  x: "hello",
  y: 54,
};
const myVar3: MyType2 = {
  x: "Hey",
  y: 23,
};

enum MyTypeKeys {
  X = "x", // will show 4 references
  Y = "y",
}

type MyType2 = {
  [MyTypeKeys.X]: string;
  [MyTypeKeys.Y]: number;
};

const getValue2 = (keyToUse: MyTypeKeys) => {
  return myVar2[keyToUse];
};
const getValue3 = (keyToUse: MyTypeKeys) => {
  return myVar3[keyToUse];
};

console.log(getValue2(MyTypeKeys.X));
console.log(getValue3(MyTypeKeys.X));
