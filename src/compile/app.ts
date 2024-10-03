const button = document.querySelector("button")! as HTMLButtonElement; // "!"" tells TS that button will never be null

// alternative to "!" above
if (button) {
  button.addEventListener("click", () => {
    console.log("clicked!");
    window.alert("You clicked me! :)");
  });
}

// Using Decorators with the DOM

function TemplateDecorator(template: string, hookId: string) {
  // actual decorator
  return function (_constructor: any) {
    // use underscore to indicate that we are not using the parameter
    const hookElement = document.getElementById(hookId); // get target element
    if (hookElement) {
      // if hook element exists will set our dedicated template string
      hookElement.innerHTML += template; // adds to static HTML
    }
  };
}

@TemplateDecorator("<h1>Template Title (Hook1)</h1>", "hook1")
class Page {
  title = "Welcome";
  constructor() {
    console.log("Creating Title Object...");
  }
}

// using decorator to replace with class property

function TemplateDecorator2(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (constructor: any) {
    console.log("TEMPLATE DECORATOR");
    const hookElement = document.getElementById(hookId);
    const replacement = new constructor();
    if (hookElement) {
      hookElement.innerHTML = template; // initializes the template
      hookElement.querySelector("h1")!.textContent = replacement.title; // overwrites the template
      // ! indicates we will definitely have a <h1> element
    }
  };
}

function Logger(log: string) {
  console.log("LOGGER FACTORY");
  return function (_constructor: Function) {
    console.log("LOGGER DECORATOR " + log);
  };
}

@Logger("Header Template")
@TemplateDecorator2("<h1>Template Title</h1>", "hook2") // the "<h1>" template basically provides the initial h1 element that gets overwritten in the decorator function with h1.textContent
class Page2 {
  title = "Welcome (Hook2)";
  constructor() {
    console.log("Creating Title Object...");
  }
}

/* 
Order of decorator execution: 

Console: 

1. LOGGER FACTORY
2. TEMPLATE FACTORY
3. TEMPLATE DECORATOR
4. Creating Title Object...
5. LOGGER DECORATOR Header Template

*/
