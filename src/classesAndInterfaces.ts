class Department {
  // by convention class names are capitalized

  constructor(parameter: string) {
    // constructor method is called every time a new instance of the class is created
    this.name = parameter; // this refers to the object that is created
  }

  name: string; // class field -> defines the key and the value type

  // functions in objects are called methods
  describe(this: Department) {
    // adding dummy parameter and declaring type to be the class makes it type safe, so that the method can only be called on instances of this class
    console.log(`Welcome to the ${this.name.toUpperCase()} department`);
  }
}

const support = new Department("Support");
const sales = new Department("Sales");

// const engineering = { describe: support.describe }; // because this is not an instance of the Department class
// engineering.describe(); // this will throw an error because the describe method is not part of the engineering object but can only be called on instances of the Department class

const engineering = { name: "Engineering", describe: support.describe }; // by adding the name property, which is needed for the describe function, it will work now, because it basically is the same now as the support instance
engineering.describe(); // this will work now
