// by convention class names are capitalized
class Department {
  // constructor method is called every time a new instance of the class is created
  constructor(parameter: string) {
    this.name = parameter; // this refers to the object that is created
  }

  // class fields -> defines the key and the value type
  public name: string;
  private employees: string[] = []; // private makes this only accessible from within the class (i.e. the class methods have to be used to modify it)

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

const support = new Department("Support");
const sales = new Department("Sales");

// const engineering = { describe: support.describe }; // because this is not an instance of the Department class
// engineering.describe(); // this will throw an error because the describe method is not part of the engineering object but can only be called on instances of the Department class

// const engineering = { name: "Engineering", describe: support.describe }; // by adding the name property, which is needed for the describe function, it will work now, because it basically is the same now as the support instance
// engineering.describe(); // this will work now

support.addEmployee("Ria", "Mariana", "Aya");
support.name = "Team Awesome"; // this will work because the name property is public
// support.employees[3] = "Jon"; // this throws an error because employees is private and cannot be accessed from outside the class
support.describe();

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
