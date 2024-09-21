// by convention class names are capitalized
class Department {
  // class fields -> defines the key and the value type
  readonly id: string;
  public name: string;
  // private employees: string[] = []; // private makes this only accessible from within the class (i.e. the class methods have to be used to modify it)
  protected employees: string[] = []; // private makes this only accessible from within the class (i.e. the class methods have to be used to modify it)

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
console.log(accounting.lastReport);
accounting.lastReport = "No updates.";
