type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // Intersection type

const elevatedEmployee: ElevatedEmployee = {
  name: "Ria",
  privileges: ["create-server"],
  startDate: new Date(),
};

// same like Interface Inheritance

interface Admin2 {
  name: string;
  privileges: string[];
}

interface Employee2 {
  name: string;
  startDate: Date;
}

interface ElevatedEmployee2 extends Admin2, Employee2 {} // Interface Inheritance

const elevatedEmployee2: ElevatedEmployee2 = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// Intersection Types with Union Types

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // Type: number

// Type Guards

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // typeof - Type Guard
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(employee: UnknownEmployee) {
  console.log("Name: " + employee.name);
  if ("privileges" in employee) {
    // in - Type Guard
    console.log("Privileges: " + employee.privileges);
  }
  if ("startDate" in employee) {
    console.log("Start Date: " + employee.startDate);
  }
}

// without Type Guard (error on .privileges and .startDate)
// function printEmployeeInformation(employee: UnknownEmployee) {
//     console.log("Name: " + employee.name);
//       console.log("Privileges: " + employee.privileges);
//       console.log("Start Date: " + employee.startDate);
//   }

printEmployeeInformation(elevatedEmployee);
printEmployeeInformation({ name: "Ben", startDate: new Date() }); // also works even without privileges because of Type Guard

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    // instanceof - Type Guard
    vehicle.loadCargo(1000);
  }
  // also works with `in` check
  if ("loadCargo" in vehicle) {
    vehicle.loadCargo(1000);
  }
}

// Discriminated Unions

interface Bird {
  type: "bird"; // Literal Type
  flyingSpeed: number;
}

interface Horse {
  type: "horse"; // Literal Type
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // possible but could get complicated with more numbers of different animals
  if ("flyingSpeed" in animal) {
    console.log("Moving at speed: " + animal.flyingSpeed);
  }
  if ("runningSpeed" in animal) {
    console.log("Moving at speed: " + animal.runningSpeed);
  }

  // better approach with Discriminated Unions
  let speed;
  switch (animal.type) {
    case "bird": // additional type safety at runtime (provided by JavaScript!)
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// Type Casting

const paragraph = document.querySelector("p"); // knows it's a HTML <p> Element
const paragraph2 = document.getElementById("message-output"); // knows only it's a HTML Element

const userInputElement = document.getElementById("user-input"); // need to tell TypeScript that it's an Input Element
// userInputElement.value = "Hi!"; // Error: Property 'value' does not exist on type 'HTMLElement'

/* Type Casting Version 1 - 
using the angle brackets before the variable name 
(HTMLInputElement is globally available because of the lib.dom in tsconfig.json) 
*/
const userInputElement2 = <HTMLInputElement>(
  document.getElementById("user-input")
);
userInputElement2.value = "Hi!"; // Error: Property 'value' does not exist on type 'HTMLElement'

/* Type Casting Version 2 - 
using the as keyword at the end of the variable name
*/
const userInputElement3 = document.getElementById(
  "user-input"
) as HTMLInputElement;
userInputElement3.value! = "Hi!";
