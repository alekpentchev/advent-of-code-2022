const fs = require("fs");
const { default: test } = require("node:test");
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
      const items = line.split(": ")[1].split(", ");
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

const processRounds = (monkeys) => {
    const rounds = Array(20)

    // go through 20 rounds
    for (let idx = 0; idx < rounds.length; idx++) {
        // let every monkey inspect its items
        for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
            const monkey = monkeys[monkeyIndex];
            for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {
                monkey.inspectedCount += 1

                const item = parseInt(monkey.items[itemIndex]);
                const operand = monkey.operation[1]
                const value = monkey.operation[2]
                const worryLevel = mathOperations[operand](item, value)
                const boredWorryLevel = worryLevel % 3

                // is divisible 
                if (boredWorryLevel === 0) {
                    const itemToSend = monkey.items.shift()
                    monkeys[monkey.destinationMonkeyIfTrue].items.push(itemToSend)
                } else {
                    const itemToSend = monkey.items.shift()
                    monkeys[monkey.destinationMonkeyIfFalse].items.push(itemToSend)
                }
            }
        }
    }

    const monkeysSorted = monkeys.map(monkey => monkey.inspectedCount).sort((a,b) => b - a)
    const monkeyBusinessLevel = monkeysSorted[0] * monkeysSorted[1]
    return monkeyBusinessLevel
    
}

// part one
prepareData(data);
console.log(processRounds(monkeys))
