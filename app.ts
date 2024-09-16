const button = document.querySelector("button")!; // ! tells TS that button will never be null

button.addEventListener("click", () => {
  console.log("clicked!");
  window.alert("You clicked me! :)");
});
