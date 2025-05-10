const boxen = require("boxen");

const title = " Hurray!!! ";
const message = "I am using my first external module!";
const msg = "unicorns love rainbows";

// Classic box (default style)
const classicBox = boxen(message, {
  title,
  padding: 1,
  margin: 1,
  borderStyle: "classic"
});

// SingleDouble style box
const singleDoubleBox = boxen(message, {
  title,
  padding: 1,
  margin: 1,
  borderStyle: "singleDouble"
});

// Round style box
const roundBox = boxen(msg, {
  title,
  padding: 1,
  margin: 1,
  borderStyle: "round"
});

// Output all boxes
console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);
