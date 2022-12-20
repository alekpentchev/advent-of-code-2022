const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");
const characters = input.split("");

const marker = new Set();

for (let index = 0; index < characters.length; index++) {
  const character = characters[index];
  if (marker.has(character)) {
    marker.clear();
    continue;
  }

  marker.add(character);

  if (marker.size === 4) {
    console.log("the result is: ", marker, index - 1);
    break;
  }
}
