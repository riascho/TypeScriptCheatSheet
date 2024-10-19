"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const button = document.querySelector("button"); // "!"" tells TS that button will never be null
// alternative to "!" above
if (button) {
    button.addEventListener("click", () => {
        console.log("clicked!");
        window.alert("You clicked me! :)");
    });
}
// Using Decorators with the DOM
function TemplateDecorator(template, hookId) {
    // actual decorator
    return function (_constructor) {
        // use underscore to indicate that we are not using the parameter
        const hookElement = document.getElementById(hookId); // get target element
        if (hookElement) {
            // if hook element exists will set our dedicated template string
            hookElement.innerHTML += template; // adds to static HTML
        }
    };
}
let Page = class Page {
    constructor() {
        this.title = "Welcome";
        console.log("Creating Title Object...");
    }
};
Page = __decorate([
    TemplateDecorator("<h1>Template Title (Hook1)</h1>", "hook1")
], Page);
// using decorator to replace with class property
function TemplateDecorator2(template, hookId) {
    console.log("TEMPLATE FACTORY");
    return function (constructor) {
        console.log("TEMPLATE DECORATOR");
        const hookElement = document.getElementById(hookId);
        const replacement = new constructor();
        if (hookElement) {
            hookElement.innerHTML = template; // initializes the template
            hookElement.querySelector("h1").textContent = replacement.title; // overwrites the template
            // ! indicates we will definitely have a <h1> element
        }
    };
}
function Logger(log) {
    console.log("LOGGER FACTORY");
    return function (_constructor) {
        console.log("LOGGER DECORATOR " + log);
    };
}
let Page2 = class Page2 {
    constructor() {
        this.title = "Welcome (Hook2)";
        console.log("Creating Title Object...");
    }
};
Page2 = __decorate([
    Logger("Header Template"),
    TemplateDecorator2("<h1>Template Title</h1>", "hook2") // the "<h1>" template basically provides the initial h1 element that gets overwritten in the decorator function with h1.textContent
], Page2);
/*
Order of decorator execution:

Console:

1. LOGGER FACTORY
2. TEMPLATE FACTORY
3. TEMPLATE DECORATOR
4. Creating Title Object...
5. LOGGER DECORATOR Header Template

*/
// Returning Values in Class Decorators
function WithClassInstantiation(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            // returns new class, essentially replacing the decorated class but by extending it
            constructor(..._) {
                super(); // call original constructor to preserve those values (otherwise would be overwritten)
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Fruit = class Fruit {
    constructor() {
        this.name = "Banana";
        console.log("Creating fruit object...");
    }
};
Fruit = __decorate([
    WithClassInstantiation("<h1>My Favorite Fruit</h1>", "hook3") // at this point the decorator function is evaluated but not executed and index.html will be empty at hook3
], Fruit);
const pear = new Fruit(); // at this point the decorator function is executed and index.html will have "Banana" in the h1 element
pear.name = "Pear";
// Example: Binding a Method with a Decorator
/*
In this example, the Autobind decorator ensures that the 'this' context of the decorated method is correctly bound to the instance of the class.
This is particularly useful in scenarios where methods are passed around as callbacks and the this context might be lost.
*/
function Autobind(_target, // prototype of the class
_methodName, // 'showMessage' in this example from below
descriptor // provides metadata about the method
) {
    const originalMethod = descriptor.value; // value holds the original method
    const updatedDescriptor = {
        // creates new property descriptor
        configurable: true,
        enumerable: false,
        get() {
            // this getter function runs before the method is called! It therefore binds the original method to the instance of the class ('this')
            const boundFunction = originalMethod.bind(this); // 'this' will come from getter method
            return boundFunction;
        },
    };
    return updatedDescriptor; // returns the updated descriptor and essentially overwrites the original method
}
class Printer {
    constructor() {
        this.message = "From Printer Class";
    }
    showMessage() {
        console.log(this.message);
        return this.message;
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const printButton = new Printer();
// without @Autobind:
// printButton.showMessage(); // this will have the this. context
// button.addEventListener("click", printButton.showMessage); // but the addEventListener will not have the this. context, because the target of the event listener is the button!
// button.addEventListener("click", printButton.showMessage.bind(printButton)); // this could be one workaround to use the bind function
// with @Autobind:
button.addEventListener("click", printButton.showMessage); // @Autobind decorator has overwritten the method to bind the 'this' context
printButton.showMessage(); // this will also still work, same 'this' context
const registeredValidators = {};
/* will be something like:
  {
    Course: {
      title: ["required"],
      price: ["positive"],
    },
  };
  */
// this function registers the class property to the validator for 'required'
function Required(target, propertyName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propertyName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []),
            "required",
        ] });
}
// this function registers the class property to the validator for 'positive'
function PositiveNumber(target, propertyName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propertyName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []),
            "positive",
        ] });
}
function validate(obj) {
    // this not a decorator function but a normal function
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        // goes through all properties
        for (const validator of objValidatorConfig[prop]) {
            // goes through the arrays of validations (['required', 'positive']) that this property got registered on
            switch (validator) {
                case "required":
                    // returns true if property is not empty
                    isValid = isValid && !!obj[prop]; // double bang "!!" to turn truthy into a real boolean (true)
                    break;
                case "positive":
                    // returns true if property is more than zero
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (event) => {
    event.preventDefault(); // this prevents the default behavior of the form element, which is to submit forms! This makes it unresponsive for now
    const titleElement = document.getElementById("title");
    const title = titleElement.value;
    const priceElement = document.getElementById("price");
    const price = +priceElement.value; // + converts string to number
    const newCourse = new Course(title, price);
    if (!validate(newCourse)) {
        // if new Course input is not valid (validate() returns false)
        alert("Invalid Input! Please Try again!");
        return;
    }
});
//# sourceMappingURL=app.js.map