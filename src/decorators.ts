// First Class Decorator

// this function is a decorator
function Logger(target: Function) {
  // the target parameter represents the constructor function of the class to which the decorator is applied.
  console.log("Logging...");
  console.log(target);
}

@Logger // apply decorator function to class
class Person {
  name = "Ria";

  constructor() {
    console.log("Loading Person...");
  }
}

const person1 = new Person();

// Decorator Factory

function LoggerFactory(logString: string) {
  // accepting parameters for customization
  // function that returns a new function
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@LoggerFactory("LOGGING - PERSON") // This allows for customizing the log message for different classes.
class Person2 {
  name = "Ben";
  constructor() {
    console.log("Creating Person Object...");
  }
}

// Property Decorators

function Log(target: any, propertyName: string) {
  console.log("Property Decorator");
  console.log(target);
  console.log(propertyName);
}

// can be applied to properties, accessors, and methods
class Product {
  // properties
  @Log // refers to property below (target and propertyName)
  title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  // accessor
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("Invalid Price - should be positive");
    }
  }

  // method
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

/* 
This will log: 

1. Property Decorator
2. {}
3. title

*/
