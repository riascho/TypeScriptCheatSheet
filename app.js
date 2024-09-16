var person = {
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
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
var role = [2, "admin"];
console.log("hello!");
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError("An error occurred!", 500);
