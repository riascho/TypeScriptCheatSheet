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
//# sourceMappingURL=app.js.map