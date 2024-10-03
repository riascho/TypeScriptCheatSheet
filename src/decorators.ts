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
