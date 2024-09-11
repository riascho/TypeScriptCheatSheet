// Creating enums in JavaScript for type safety

const APP_STATES = Object.freeze({
  RUNNING: "running",
  ON_HOLD: "on-hold",
  STOPPED: "stopped",
});

// Object.freeze -> freezes the object so that it cannot be modified

// const resumed = APP_STATES.RESUMED; // throws an error
// APP_STATES.STOPPED = "paused"; // throws an error

enum ROLES {
  ADMIN = "admin",
  READ_ONLY = "read-only",
  VIEWER = "viewer",
}

const person2 = {
  name: "Ria",
  age: 34,
  role: ROLES.ADMIN,
};
