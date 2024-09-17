const button = document.querySelector("button")!; // ! tells TS that button will never be null

// if (button) { // ! type check not necessary if runtime check is done
button.addEventListener("click", () => {
  console.log("clicked!");
  window.alert("You clicked me! :)");
});
// }
