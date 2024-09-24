// defining a custom type
type PersonType = {
  firstName: string;
  lastName: string;
  age: number;
  yearOfBirth: number;

  greet(phrase: string): void;
};

// vs. defining an interface
interface PersonInterface {
  firstName: string;
  lastName: string;
  age: number;
  yearOfBirth: number;

  greet(phrase: string): void;
}

let user1: PersonInterface;

user1 = {
  firstName: "Ria",
  lastName: "Scholz",
  age: 34,
  yearOfBirth: 1990,
  greet(phrase: string) {
    console.log(phrase + " " + this.firstName);
  },
};

user1.greet("Hi there - I am");

interface SocialSecurity {
  healthInsurance: {
    provider: string;
    number: string;
  };
  taxId?: number; // optional property
}

interface IDInterface extends SocialSecurity {
  readonly id: string;
  output?(): void; // optional method
}

// using interfaces for class
class Person implements PersonInterface, IDInterface {
  readonly id: string;
  firstName: string;
  lastName: string;
  age: number;
  yearOfBirth: number;

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    yearOfBirth: number,
    public healthInsurance: { provider: string; number: string },
    taxId?: number // optional parameter
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.yearOfBirth = yearOfBirth;
    this.id = Math.ceil(Math.random() * 100).toString();
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.firstName);
  }
}

let user2 = new Person(
  "Ben",
  "Smith",
  30,
  1990,
  {
    provider: "AOK",
    number: "123456",
  },
  56789
);
console.log(user2);
// user2.id = "234"; // throws error because id is readonly
console.log(user2);

// Function Types
interface AddFunction {
  (a: number, b: number): number;
}

// let add: AddFunction = (n1: string, n2: number) => { // will throw error because n1 has to be a number type
//   return n1 + n2;
// };
