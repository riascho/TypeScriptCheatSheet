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
  if (false) {
    reject("Error");
  }
});

// Creating a generic function

// without using generics
function mergeObjects(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

const obj1 = { name: "Ria" };
const obj2 = { age: 34 };

const mergedObject = mergeObjects(obj1, obj2);
// mergedObject.name; // error: cannot access property
const mergedObject2 = mergeObjects(obj1, obj2) as { name: string; age: number };
mergedObject2.name; // fix this error by type casting (but too cumbersome)

// function mergeObjectsGeneric<T, U>(objC: T, objD: U): T & U {
// defines that these are two different objects and will return intersection of two types T & U
// return Object.assign(objC, objD);
// }

// const mergedObject3 = mergeObjectsGeneric(obj1, obj2); // T and U are defined every time when function is called
// mergedObject3.name; // no error
// const mergedObject4 = mergeObjectsGeneric(obj1, 34); // no error thrown, but could be a problem if we don't want to accept numbers here

// Constraints

function mergeObjectsGenericWithConstraints<T extends object, U extends object>(
  // type T and U are generic (any type at function call) but have to be an object
  objE: T,
  objF: U
): T & U {
  return Object.assign(objE, objF);
}

// const mergedObject5 = mergeObjectsGenericWithConstraints(obj1, 34); // error because object is expected and not a simple number

// with generic types we can be more flexible as to which input types are allowed.
// Here I don't want to restrict the input to strings or arrays but only need to make sure that
// whatever type is passed in has a length property.
interface Lengthy {
  length: number;
}

function countAndPrint<T extends Lengthy>(
  element?: T
): [T | undefined, string] {
  // if no element was passed in then T will be undefined
  // "?" makes element an optional argument
  let text = "Got no value";
  if (element && element.length > 0) {
    // need to check if element was passed in
    text = `Got ${element.length} elements`;
  }
  return [element, text];
}

console.log(countAndPrint("Hi there!")); // [ 'Hi there!', 'Got 9 elements' ]
console.log(countAndPrint(["Swimming", "Yoga"])); // [ [ 'Swimming', 'Yoga' ], 'Got 2 elements' ]
console.log(countAndPrint()); // [ undefined, 'Got no value' ]

// keyof constraint

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
): string {
  // need to make sure that obj has that key before accessing it!
  // T is any kind of object
  // U is key of T !
  return "Value: " + obj[key];
}

const object1 = { name: "Ria", age: 34 };

// console.log(extractAndConvert({}, "name")); //   No index signature with a parameter of type 'string' was found on type '{}'.
console.log(extractAndConvert({ name: "Ria" }, "name")); //   Value: Ria
// console.log(extractAndConvert(object1, "hobbies")); // error

// Generic Classes

// If we do not care about the type but want to make sure that whatever type is the class is instantiated with is consistent.
class DataStorage<T extends string | number | boolean | Date> {
  // we constrain our T type to only accept primitive data types (so that no objects or arrays are passed in, as they cannot be modified correctly with the indexOf() function)
  private data: T[] = [];

  addItems(...items: T[]) {
    this.data.push(...items);
  }

  removeItems(...item: T[]) {
    for (const i of item) {
      if (this.data.indexOf(i) === -1) {
        // if item is not found, indexOf returns -1 (which would otherwise remove the last item)
        return;
      }
      this.data.splice(this.data.indexOf(i), 1); // indexof only works for primitive data types (not for objects or arrays!)
    }
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>(); // here we use generic type to be strings from now on
textStorage.addItems("Ria", "Ben"); // this works
// textStorage.addItems(18); // throws error because it's not a string

const numberStorage = new DataStorage<number>(); // here we use generic type to be numbers from now on
numberStorage.addItems(18, 23, 45, 16, 78); // this works
// numberStorage.removeItems("Ria"); // throws error because it's not a number

console.log(numberStorage.getItems());
numberStorage.removeItems(23, 45);
console.log(numberStorage.getItems());

// const objectStorage = new DataStorage<object>(); // Type 'object' does not satisfy the constraint 'string | number | boolean'.ts(2344)
// const obj1 = { name: "Ria" };
// objectStorage.addItems(obj1);
// objectStorage.addItems({ name: "Ben" });
// console.log(objectStorage.getItems());
// objectStorage.removeItems(obj1); // this would not actually remove obj1 from the array, because the reference to the object is different
// console.log(objectStorage.getItems());

const today = new Date();
const yesterday = today.getDate() - 1;
const tomorrow = today.getDate() + 1;

const dateStorage = new DataStorage();
dateStorage.addItems(today, yesterday, tomorrow);
dateStorage.removeItems(today);
console.log(dateStorage.getItems());

// Generic Utility Types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

// Partial

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // Partial tells TypeScript that this empty object {} will be a CourseGoal but makes all properties optional
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal; // need to cast it at the end because we want the return type to have all properties mandatory
}

// Readonly

const fixedCoordinates: Readonly<number[]> = [123.45, 56.78];
// fixedCoordinates[0] = 124; // error: Index signature in type 'readonly number[]' only permits reading

// btw
const fixedCoordinates2: [number, number] = [123.45, 56.78];
fixedCoordinates2[0] = 124; // no error

const course1: Readonly<CourseGoal> = {
  title: "TypeScript Course",
  description: "Learn TypeScript",
  completeUntil: new Date(1081762356789),
};

// course1.completeUntil = new Date(1081762356789); // error: Cannot assign to 'completeUntil' because it is a read-only property
