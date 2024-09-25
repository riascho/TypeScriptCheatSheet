// by convention class names are capitalized
class Department {
  // class fields -> defines the key and the value type
  readonly id: string;
  public name: string;
  // private employees: string[] = []; // private makes this only accessible from within the class (i.e. the class methods have to be used to modify it)
  protected employees: string[] = []; // private makes this only accessible from within the class (i.e. the class methods have to be used to modify it)
  static fiscalYear = 2024; // static properties can be called on the class itself without having to instantiate a class object

  // constructor method is called every time a new instance of the class is created
  constructor(id: string, parameter: string) {
    this.id = id;
    this.name = parameter; // this refers to the object that is created
  }

  // functions in objects are called methods
  describe(this: Department) {
    // adding dummy parameter and declaring type to be the class makes it type safe, so that the method can only be called on instances of this class
    console.log(`Welcome to the ${this.name.toUpperCase()} department`);
  }
  // static methods can be called on the class itself without having to instantiate a class object
  static createEmployee(name: string) {
    return { name: name };
  }

  addEmployee(...employee: string[]) {
    this.employees.push(...employee);
  }

  printEmployees() {
    console.log(this.employees.length);
    console.log(...this.employees);
  }
}

const support = new Department("002", "Support");
const sales = new Department("001", "Sales");

// const engineering = { describe: support.describe }; // because this is not an instance of the Department class
// engineering.describe(); // this will throw an error because the describe method is not part of the engineering object but can only be called on instances of the Department class

// const engineering = { name: "Engineering", describe: support.describe }; // by adding the name property, which is needed for the describe function, it will work now, because it basically is the same now as the support instance
// engineering.describe(); // this will work now

support.addEmployee("Ria", "Mariana", "Aya");
support.name = "Team Awesome"; // this will work because the name property is public
// support.employees[3] = "Jon"; // this throws an error because employees is private and cannot be accessed from outside the class
support.describe();

/*
class Employee {
  // public id: number;
  // private firstName: string;
  // private lastName: string;

  constructor(
    private readonly id: number,
    public firstName: string,
    public lastName: string
  ) {
    // this.id = id;
    // this.firstName = firstName;
    // this.lastName = lastName;
  }
}

const ben = new Employee(46, "Benjamin", "Igbo");
// ben.id = 78; // this will throw an error because the id property is readonly
*/

class ITDepartment extends Department {
  // can only inherit from one class
  public admins: string[];

  constructor(uid: string, admins: string[]) {
    super(uid, "IT"); // whenever you have a constructor in a subclass, you need to call the constructor of the base class with super() providing the same parameters as the base class constructor;
    // super() always has to be called first before any this. properties are accessed
    this.admins = admins;
  }

  addEmployee(...employee: string[]) {
    if (employee.includes("Maria")) {
      return;
    } else {
      this.employees.push(...employee);
    }
  }

  getAdmins() {
    console.log(...this.admins, this.id);
  }
}

const it = new ITDepartment("006", ["Jon", "Bart"]); // this inherits properties from constructor of base class (Department) into Subclass (ITDepartment)
it.getAdmins();
it.addEmployee("Maria");
it.printEmployees();

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

  set mostRecentReport(value: string) {
    this.addReport(value);
  }

  addReport(report: string) {
    this.lastReport = report;
    this.reports.push(report);
  }

  printReports() {
    console.log(...this.reports);
  }
}
const accounting = new AccountingDepartment("008", []);
// console.log(accounting.mostRecentReport); // will throw error 'No reports found.'
accounting.addReport("ARR gone up by 56%!");
console.log(accounting.mostRecentReport); // getter is called like a property
accounting.mostRecentReport =
  "AI Integration has doubled over the last 3 months!";
accounting.printReports();

// both will throw error 'Property 'lastReport' is private and only accessible within class 'AccountingDepartment'.
// console.log(accounting.lastReport);
// accounting.lastReport = "No updates.";

// accessing static methods & properties
const employee1 = Department.createEmployee("Josie");
console.log(employee1);
console.log(Department.fiscalYear);

// Abstract Class
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

// class SalesProject extends Project {
// if the changeName method is not implemented, this will throw an error
// " Non-abstract class 'SalesProject' does not implement inherited abstract member changeName from class 'Project'. "
// }

const project1 = new AIProject("AI Integration");
project1.changeName("AI Automation");
// project1.changeName("Automation"); // will throw error

// Singleton Pattern

class House {
  name: string;
  protected constructor(name: string) {
    this.name = name;
  }

  describe() {
    console.log("Welcome to", this.name);
  }
}

// every house should only have one instance of kitchen
class Kitchen extends House {
  // private keyword applied for constructor
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
