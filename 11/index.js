const fs = require("fs");
const { default: test } = require("node:test");
const data = fs.readFileSync("input.txt", "utf-8").split("\n");

const monkeys = []

const prepareData = (data) => {
    let currentMonkey = null
    for (let idx = 0; idx < data.length; idx++) {
        const line = data[idx];

        if (line.startsWith('Monkey')) {
            // first monkey should just be assigned
            const monkeyName = parseInt(line.split(' ')[1])
            if (currentMonkey === null) {
                currentMonkey = {inspectedCount: 0, monkeyName }
            } else {
                monkeys.push(currentMonkey)
                currentMonkey = {inspectedCount: 0, monkeyName}
            }
        } else if (line.startsWith('  Starting items')) {
            // assign items to current monkey
            const items = line.split(': ')[1].split(', ')
            currentMonkey.items = items
        } else if (line.startsWith('  Operation')) {
            // extract the operation
            const operation = line.split('= ')[1].split(' ')
            currentMonkey.operation = operation
        } else if (line.startsWith('  Test')) {
            const testDivisionValue = parseInt(line.split(': ')[1].split(' ')[2])
            currentMonkey.testDivisionValue = testDivisionValue
        } else if (line.startsWith('    If true')) {
            const destinationMonkeyIfTrue = parseInt(line.split(': ')[1].split(' ')[3])
            currentMonkey.destinationMonkeyIfTrue = destinationMonkeyIfTrue
        } else if (line.startsWith('    If false')) {
            const destinationMonkeyIfFalse = parseInt(line.split(': ')[1].split(' ')[3])
            currentMonkey.destinationMonkeyIfFalse = destinationMonkeyIfFalse

            // handle last line; push last monkey
            if (data[idx + 1] === undefined) {
                monkeys.push(currentMonkey)
            }
        }

        
    }
}

// part one
prepareData(data)
