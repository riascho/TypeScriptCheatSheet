const button = document.querySelector("button")! as HTMLButtonElement; // "!"" tells TS that button will never be null

// alternative to "!" above
if (button) {
  button.addEventListener("click", () => {
    console.log("clicked!");
    window.alert("You clicked me! :)");
  });
}
