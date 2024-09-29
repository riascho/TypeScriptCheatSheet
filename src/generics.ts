// Built-in Generics

const names: Array<string> = [];
// same as
const names2: string[] = [];

// also possible with union types
const names3: Array<string | number> = [];
const names4: string[] | number[] = [];

// promise type that will eventually return a string
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

// Creating a generic function
