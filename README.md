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

```typescript
function add(n1: number, n2: number);
```

_NOTE:_ The core primitive types in TypeScript are all lowercase!

### JavaScript Type Check

```typescript
if (typeof n1 !== "number" || typeof n2 !== "number") {
  throw new Error("Incorrect input!");
}
```

## Type Inference (implicit)

TypeScript assigns types by inference upon declaration of variable.

```typescript
const num1 = 5; // Type: 5
let num2 = 2.8; // Type: number
```

## Type Assignment (explicit)

For unknown variables the type has to be assigned, so TypeScript knows what to expect.

```typescript
let num1: number;
```

```typescript
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2;
  if (showResult === true) {
    console.log(phrase + result);
  } else {
    return result;
  }
}
```

## Object Types

Defining an object type with `object` or `{}` will not define the containing key-value pairs!

```typescript
const person: object = {
  name: "Ria",
  age: 34,
};
```

```typescript
const person: {} = {
  name: "Ria",
  age: 34,
};
```

Defining the object's specific key-value pair types, separated by `;`. However, it's better to do this by inference.

```typescript
const person: {
  name: string;
  age: number;
} = {
  name: "Ria",
  age: 34,
};
```

```typescript
const person = {
  name: "Ria",
  age: 34,
};
```

## Array Types

The `[]` after the type indicates that it is an array containing these types.

```typescript
const hobbies: string[] = ["Yoga", "Swimming", "Coding"];
```

Union Types:

```typescript
const labels: (string | number)[] = ["red", "green", 1];
```

## Tuples

When TypeScript's Inference is not enough, we need to explicitely set the type.

E.g. `role` would be inferred as a simple `(number | string)[]` but if we want it to always only contain a number and a string (in that order), we need to explicitely declare it.

```typescript
const role: [number, string] = [2, "admin"];
```

## Enums

Type only available in TypeScript. By default assigns numbers (from 0) to given labels. These properties can be accessed and assigned via dot notation. Enums are usually declared in uppercase.

```typescript
enum ROLES {
  ADMIN,
  READ_ONLY,
  VIEWER,
}

console.log(ROLES.ADMIN === 0); // true
```

Will be compiled in JavaScript as below:

```typescript
var ROLES;
(function (ROLES) {
  ROLES[(ROLES["ADMIN"] = 0)] = "ADMIN";
  ROLES[(ROLES["READ_ONLY"] = 1)] = "READ_ONLY";
  ROLES[(ROLES["VIEWER"] = 2)] = "VIEWER";
})(ROLES || (ROLES = {}));
```

This is different for strings though or other definitions

```typescript
enum ROLES {
  ADMIN = "admin",
  READ_ONLY = "read-only",
  VIEWER = 100,
}
```

```typescript
var ROLES;
(function (ROLES) {
  ROLES["ADMIN"] = "admin";
  ROLES["READ_ONLY"] = "read-only";
  ROLES["VIEWER"] = "viewer";
})(ROLES || (ROLES = {}));
```

## Type Aliases

create your own type with any definition (usually using type unions). Type Aliases are usually declared in Title case.

```typescript
type MyOwnTypeAlias = number | string;
let numberOrString: MyOwnTypeAlias;
type YesOrNo = "yes" | "no";
let gameOver: YesOrNo;
```

Type Aliases are not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.

```typescript
type User = { name: string; age: number };

function greet(user: User) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```

## Function Types

In general it is best left to TypeScript to infer the type that is returned from a function. The return type `: void` indicates the function does not return anything (`return` keyword is not used). The type `: undefined` can be used when the function has a `return` statement but no value.
e.g.

```typescript
function printEach(arr: number[]): void {
  arr.forEach((num) => console.log(num));
}

function printEach2(arr: number[]): undefined {
  arr.forEach((num) => console.log(num));
  return;
}
```

Use `: Function` type when a variable is only to be declared for a (any) function.

```typescript
let combineValues: Function;
combineValues = addition;
combineValues = 88; // this will throw a compile time error because it cannot be assigned to a number!
console.log(combineValues(8, 8));
```

Create a function type instead to be more specific about what parameters and return values the function should have.

```typescript
let combineValues: () => number; // defines a function that has no parameters and returns a number

let combineValues: (x: number, y: number) => string; // defines a function that has two parameters of type number and returns a string
```

Use Function Type definition for callback functions as well.

```typescript
function addAndHandle(n1: number, n2: number, cb: (res: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => console.log(result)); // cb is invoked with the result with type checking
addAndHandle(10, 20, (result, b) => console.log(result)); // throws compile time error because only one parameter is expected
```

Setting a return value of `void` will ignore any returned values from the callback. It is simply indicating that the possible return value may not be used.

If the callback function should be prohibited from returning anything, use `undefined`.

```typescript
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

```typescript
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

# TypeScript Classes

## Class Declaration

In TypeScript, classes are declared using the `class` keyword followed by the class name. By convention, class names are capitalized.

## Constructor

The constructor method is called every time a new instance of the class is created. It is used to initialize the object's properties.

## Class Fields

Class fields define the keys and their value types within the class.

## Methods

Functions within objects are called methods. In TypeScript, you can add a dummy parameter and declare its type to be the class itself to make it type-safe. This ensures that the method can only be called on instances of the class.

```typescript
class Department {
  constructor(parameter: string) {
    this.name = parameter;
  }
  name: string;
  describe(this: Department) {
    console.log(`Welcome to the ${this.name.toUpperCase()} department`);
  }
}
```

## Creating Instances

You can create instances of a class using the `new` keyword followed by the class name and any required parameters.

```typescript
const support = new Department("Support");
const sales = new Department("Sales");
```

## The `this` Context

The `this` context in TypeScript refers to the current instance of the class. When assigning methods to objects that are not instances of the class, you need to ensure that the required properties are present.

```typescript
const engineering = { describe: support.describe };
engineering.describe(); // This will throw an error

const engineering = { name: "Engineering", describe: support.describe };
engineering.describe(); // This will work - Output: Welcome to the ENGINEERING department
```

## Access Modifiers

In TypeScript, you can control the visibility of class members using access modifiers.

- **public:** Members are accessible from anywhere.
- **private:** Members are only accessible within the class they are defined.
- **readonly:** Members can be read from anywhere but cannot be modified after their initial assignment.

By default, all class members are `public` unless explicitly specified otherwise.

```typescript
class Department {
  readonly id: number;
  public name: string;
  private employees: string[] = [];

  constructor(parameter: string) {
    this.id = id;
    this.name = parameter;
  }

  addEmployee(...employee: string[]) {
    this.employees.push(...employee);
  }

  printEmployees() {
    console.log(this.employees.length);
    console.log(...this.employees);
  }
}

const support = new Department("Support");
support.addEmployee("Ria", "Mariana", "Aya");

// The following line will throw an error because 'employees' is a private member
support.employees[3] = "Jon"; // Error: Property 'employees' is private and only accessible within class 'Department'

// The following line will throw an error because 'id' is a readonly member
support.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
```

_NOTE:_ These modifiers are introduced by TypeScript. Meaning that, JavaScript will not differentiate and it is possible to modify class properties or methods from outside. Hence they will only cause compile time errors but no runtime errors.

## Shorthand Initialization

Instead of writing this:

```typescript
class Product {
  title: string;
  price: number;
  private isListed: boolean;

  constructor(name: string, pr: number) {
    this.title = name;
    this.price = pr;
    this.isListed = true;
  }
}
```

You can use Shorthand Initialization like this (duplicate field properties can be used as parameters with their access modifiers)

```typescript
class Product {
  private isListed: boolean;

  constructor(public title: string, public price: number) {
    this.isListed = true;
  }
}
```

## Inheritance

Use inheritance to create `sub-classes` that are passed on properties and methods from a `base class` with the keyword `extends`.

- only one class be inherited from
- `super()` has to be called in the sub-class' constructor to pass in the same properties from the base class constructor. `super()` has to be called before any other sub-class specific properties.
- `private` will not be inherited and therefore the sub-class will have no access to private properties or methods of the base class.
- use `protected` if the property shall only be accessible from the class object but this will be inherited as well to sub-classes.

```typescript
// Base Class
class Department {
  // private employees: string[] = [];
  protected employees: string[] = [];
  constructor(readonly id: string, public name: string) {}
}
```

```typescript
// Sub-Class
class ITDepartment extends Department {
  public admins: string[];

  constructor(uid: string, admins: string[]) {
    super(uid, "IT");
    this.admins = admins;
  }
  getAdmins() {
    console.log(...this.admins, this.id);
  }
}
```

initializing `sub-class` object

```typescript
const it = new ITDepartment("006", ["Jon", "Bart"]);
it.getAdmins();
```

initializing `base class` object

```typescript
const support = new Department("002", "Support");
```

## Getters & Setters

A `getter` function in a class is a method that allows you to access the value of a private property from outside the class. It is defined using the `get` keyword and typically returns the value of the property. It has to `return` something.

```typescript
class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(uid: string, private reports: string[]) {
    super(uid, "Accounting");
    this.lastReport = reports[-1];
  }

  get mostRecentReport() {
    if (this.reports.length > 0) {
      return this.lastReport;
    } else {
      throw new Error("No reports found.");
    }
  }

  addReport(report: string) {
    this.lastReport = report;
    this.reports.push(report);
  }
}
```

The `get` method is called like it was a property.

```typescript
console.log(accounting.mostRecentReport);
```

---

A `setter` function in a class is a method that allows you to set the value of a private property from outside the class. It is defined using the `set` keyword and typically assigns a value to the property. It must take a parameter.

```typescript
class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(uid: string, private reports: string[]) {
    super(uid, "Accounting");
    this.lastReport = reports[-1];
  }

  set mostRecentReport(value: string) {
    this.addReport(value);
  }

  addReport(report: string) {
    this.lastReport = report;
    this.reports.push(report);
  }
}
```

The `set` method is called like it was a property.

```typescript
accounting.mostRecentReport =
  "AI Integration has doubled over the last 3 months!";
```

---

In both scenarios accessing the `private` `lastReport` property will not work. For this reason, the `getter` and `setter` methods were introduced.

```typescript
/* both will throw error:

'Property 'lastReport' is private and only accessible within class 'AccountingDepartment'. 

*/

console.log(accounting.lastReport);
accounting.lastReport = "No updates.";
```

## Static Methods & Properties

These can be defined within a class but are accessible without having to instantiate a class object.

```typescript
class Department {
  // static property
  static fiscalYear = 2024;
  protected employees: string[] = [];
  constructor(readonly id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Welcome to the ${this.name.toUpperCase()} department`);
  }
  // static method
  static createEmployee(name: string) {
    return { name: name };
  }
}
```

Can be used without instantiating the class:

```typescript
const employee1 = Department.createEmployee("Josie");
console.log(employee1); // { name: 'Josie' }
console.log(Department.fiscalYear); // 2024
```

_NOTE:_ static members cannot be accessed from within the class, because the `this` keyword is not attached to them. Instead you would have to use it with the class namespace instead (e.g. instead of `this.fiscalYear` you can refer to it as `Department.fiscalYear`)

## Abstract Classes & Methods

An abstract class is a class that has instructions (methods) for any derived sub-classes. Abstract classes are useful for defining a common interface for a group of related classes while allowing each derived class to provide its own specific implementation.

Abstract methods are used when you want to enforce a specific method from the base class to be implemented on any derived sub-classes.

- abstract classes cannot be instantiated.
- if the `abstract` keyword is used on any abstract property or method, the whole class will need to be defined as `abstract`.
- abstract methods do not have a body but will need a return type. They essentially only describe **WHAT** they have to be used for and that they **have to be** implemented by the sub-class, but the **HOW** is up to the sub-class to be defined.

```typescript
abstract class Project {
  constructor(protected projectName: string) {}

  abstract changeName(name: string): void; // abstract methods have to be implemented in the derived classes
}

class AIProject extends Project {
  // base class has abstract method, so derived class has to implement it
  changeName(name: string) {
    if (name.startsWith("AI")) {
      this.projectName = name;
    } else {
      throw new Error("Project name must start with AI");
    }
  }
}

class SalesProject extends Project {
  // if the changeName method is not implemented, this will throw an error
  // " Non-abstract class 'SalesProject' does not implement inherited abstract member changeName from class 'Project'. "
}

const project1 = new AIProject("AI Integration");
project1.changeName("AI Automation");
project1.changeName("Automation"); // will throw error
```

## Singletons & Private Constructors

The Singleton pattern is a way of making sure that a class can only be instantiated once, i.e. that only one instance of the class can exist at any given time. This is done by setting the `private` keyword in front of the constructor of that class.

```typescript
class House {
  protected constructor(name: string) {}
}

// every house should only have one instance of kitchen
class Kitchen extends House {
  // private keyword applied for constructor
  private constructor(name: string) {
    super(name);
  }
}

const kitchen = new Kitchen("Ikea"); // will throw error:
// " Constructor of class 'Kitchen' is private and only accessible within the class declaration. "
```

However, now we cannot instantiate this class at all. We will need to implement a `static` method to kitchen class where the object is instantiated only once.

```typescript
class Kitchen extends House {
  private constructor(name: string) {
    super(name);
  }

  private static instance: Kitchen; // here the single object is stored as instance variable

  static setInstance() {
    // if this class has been instantiated already (= instance variable is not null)
    if (Kitchen.instance) {
      return this.instance; // it will return the instance and assign it to the object
    } // else we can create the instance (i.e. the object) from within the class declaration. This is the only way to create an instance of this class
    this.instance = new Kitchen("Ikea");
    return this.instance;
  }
}

// const kitchen = new Kitchen("Ikea"); // will throw error: Constructor of class 'Kitchen' is private and only accessible within the class declaration.

const kitchen = Kitchen.setInstance();
const kitchen2 = Kitchen.setInstance(); // this will return the same instance as kitchen

console.log(kitchen);
console.log(kitchen2);
// both will log " Kitchen { name: 'Ikea' } "
```

# TypeScript Interfaces

Interfaces are used to define the structure of objects. It specifies the properties and methods that an object must have, but it does not provide implementations for those methods.
Interfaces are used to define the shape of data and to enforce type checking at compile time.

- interfaces can only be used to define the types in an object
- custom types can be used to define anything, e.g. union types
- interfaces can be used to define the type for classes (with `implements` keyword)
- a class can implement many interfaces (as opposed to only inherit from one base class)
- interfaces are used to share functionality amongst different classes (a minimum base structure), but any class that implements it, can define other properties and methods on top.
- a bit like abstract classes but without the implementation instructions
- interface properties can be `readonly` but not `public` or `private`
- interfaces can be inherited as well using the `extends` keyword (as opposed to classes, it's possible to inherit from multiple interfaces)
- methods and properties in an interface can be marked as optional by using `?` at the end
