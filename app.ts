const person = {
  name: "Ria",
  age: 34,
  hobbies: ["Yoga", "Swimming", "Coding"],
  role: [2, "admin"],
  address: {
    street: "123 Main St",
    city: "New York",
  },
};

console.log(person.name);
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

const role: [number, string] = [2, "admin"];
