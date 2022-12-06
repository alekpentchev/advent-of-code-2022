const fs = require("fs");

// 1.) First, we get the string input for the puzzle
const input = fs.readFileSync("input.txt", "utf-8");
const rucksacks = input.split("\n");
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function calculatePrioritiesInTwo(rucksacks) {
  const prioritiesSum = rucksacks.reduce((total, rucksack) => {
    let commonLetter = "";
    // 1. divide string in 2 elements
    const middleIndex = rucksack.length / 2;
    const compartments = [
      rucksack.slice(0, middleIndex),
      rucksack.slice(middleIndex, rucksack.length),
    ];
    // 2. find common letter
    const firstCompartmentSet = new Set(compartments[0].split(""));
    const secondCompartmentSet = new Set(compartments[1].split(""));

    for (let char of firstCompartmentSet.values()) {
      if (secondCompartmentSet.has(char)) {
        commonLetter = char;
      }
      //   break
    }
    // 3. get priority [a-z] -> [1-26]; [A-Z] -> [27-52]
    let priorityValue = 0;
    if (commonLetter == commonLetter.toUpperCase()) {
      // upper
      const idx = alphabet.indexOf(commonLetter.toLowerCase());
      priorityValue = idx + 1 + 26;
      if (idx === -1) priorityValue = 0;
    } else if (commonLetter == commonLetter.toLowerCase()) {
      // lower
      const idx = alphabet.indexOf(commonLetter);
      priorityValue = idx + 1;
      if (idx === -1) priorityValue = 0;
    }
    // 4. sum every priority and return
    return total + priorityValue;
  }, 0);

  return prioritiesSum;
}

console.log(calculatePrioritiesInTwo(rucksacks));

function calculatePrioritiesInThree(rucksacks) {
  let result = 0;
  let rucksacksInThree = [];

  for (let i = 0; i < rucksacks.length; i += 3) {
    rucksacksInThree.push(rucksacks.slice(i, i + 3));
  }

  // 2. find common letter
  for (let index = 0; index < rucksacksInThree.length; index++) {
    const element = rucksacksInThree[index];
    const firstCompartmentSet = new Set(element[0].split(""));
    const secondCompartmentSet = new Set(element[1].split(""));
    const thirdCompartmentSet = new Set(element[2].split(""));


    for (let char of firstCompartmentSet.values()) {
      if (secondCompartmentSet.has(char) && thirdCompartmentSet.has(char)) {
        // 3. get priority [a-z] -> [1-26]; [A-Z] -> [27-52]
        let priorityValue = 0;
        if (char == char.toUpperCase()) {
          // upper
          const idx = alphabet.indexOf(char.toLowerCase());
          priorityValue = idx + 1 + 26;
          if (idx === -1) priorityValue = 0;
        } else if (char == char.toLowerCase()) {
          // lower
          const idx = alphabet.indexOf(char);
          priorityValue = idx + 1;
          if (idx === -1) priorityValue = 0;
        }

        result += priorityValue;
      }
    }
  }
  return result;
}

console.log(calculatePrioritiesInThree(rucksacks));