const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf-8").split("\n");

const monkeys = [];

const mathOperations = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
  "%": (x, y) => x % y,
  "**": (x, y) => x ** y,
};

const prepareData = (data) => {
  let currentMonkey = null;
  for (let idx = 0; idx < data.length; idx++) {
    const line = data[idx];

    if (line.startsWith("Monkey")) {
      // first monkey should just be assigned
      if (currentMonkey === null) {
        currentMonkey = { inspectedCount: 0 };
      } else {
        monkeys.push(currentMonkey);
        currentMonkey = { inspectedCount: 0 };
      }
    } else if (line.startsWith("  Starting items")) {
      // assign items to current monkey
      const items = line.split(": ")[1].split(", ").map(num => parseInt(num));
      currentMonkey.items = items;
    } else if (line.startsWith("  Operation")) {
      // extract the operation
      const operation = line.split("= ")[1].split(" ");
      currentMonkey.operation = operation;
    } else if (line.startsWith("  Test")) {
      const testDivisionValue = parseInt(line.split(": ")[1].split(" ")[2]);
      currentMonkey.testDivisionValue = testDivisionValue;
    } else if (line.startsWith("    If true")) {
      const destinationMonkeyIfTrue = parseInt(
        line.split(": ")[1].split(" ")[3]
      );
      currentMonkey.destinationMonkeyIfTrue = destinationMonkeyIfTrue;
    } else if (line.startsWith("    If false")) {
      const destinationMonkeyIfFalse = parseInt(
        line.split(": ")[1].split(" ")[3]
      );
      currentMonkey.destinationMonkeyIfFalse = destinationMonkeyIfFalse;

      // handle last line; push last monkey
      if (data[idx + 1] === undefined) {
        monkeys.push(currentMonkey);
      }
    }
  }

//   console.log(monkeys)
};

const processRounds = (monkeys, rounds) => {

    // go through 20 rounds
    for (let idx = 0; idx < rounds; idx++) {
        // let every monkey inspect its items
        for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
            const monkey = monkeys[monkeyIndex];
            // inspect items
            for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {
                monkey.inspectedCount += 1;
                const worryLevel = parseInt(monkey.items[itemIndex]);
                const operand = monkey.operation[1]
                const value = monkey.operation[2] === 'old' ? worryLevel : parseInt(monkey.operation[2])
                const newWorryLevel = mathOperations[operand](worryLevel, value)
                const boredWorryLevel = Math.floor(newWorryLevel / 3)
                monkey.items[itemIndex] = boredWorryLevel
                const test = boredWorryLevel % monkey.testDivisionValue

                if (test === 0) {
                    const itemToSend = monkey.items[itemIndex]
                    monkeys[monkey.destinationMonkeyIfTrue].items.push(itemToSend)
                } else {
                    const itemToSend = monkey.items[itemIndex]
                    monkeys[monkey.destinationMonkeyIfFalse].items.push(itemToSend)
                }
            }
            monkey.items = []
        }
    }

    const monkeysSorted = monkeys.map(monkey => monkey.inspectedCount).sort((a,b) => b - a)
    const monkeyBusinessLevel = monkeysSorted[0] * monkeysSorted[1]
    return monkeyBusinessLevel
    
}

// part one
prepareData(data);
console.log(processRounds(monkeys, 20))
