// Class Decorator

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

// Other Decorators

function PropertyLog(target: any, propertyName: string) {
  console.log("Property Decorator");
  console.log(target);
  console.log(propertyName);
}

function AccessorLog(
  target: any,
  accessorName: string,
  propertyDescriptor: PropertyDescriptor
) {
  console.log("Accessor Decorator");
  console.log(target);
  console.log(accessorName);
  console.log(propertyDescriptor);
}

function MethodLog(
  target: any,
  methodName: string,
  propertyDescriptor: PropertyDescriptor
) {
  console.log("Method Decorator");
  console.log(target);
  console.log(methodName);
  console.log(propertyDescriptor);
}

function ParameterLog(target: any, methodName: string, position: number) {
  console.log("Parameter Decorator");
  console.log(target);
  console.log(methodName);
  console.log(position);
}

// can be applied to properties, accessors, and methods
class Product {
  // properties
  @PropertyLog // refers to property below (target and propertyName)
  title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  // accessor
  @AccessorLog
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("Invalid Price - should be positive");
    }
  }

  // method
  @MethodLog
  getPriceWithTax(@ParameterLog tax: number) {
    return this._price * (1 + tax);
  }
}

/* 
Order of Execution: 

1. Property Decorator
2. Access Decorator
3. Parameter Decorator
4. Method Decorator

*/
