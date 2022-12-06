const fs = require("fs");

// 1.) First, we get the string input for the puzzle
const input = fs.readFileSync("input.txt", "utf-8").split('\n\n');
const stacksInput = input[0];

let lines = stacksInput.split('\n');
// 1. remove last entry with stack names to simplify array processing
lines = lines.slice(0, lines.length -1);
const operations = input[1].split('\n')

for (let index = 0; index < operations.length; index++) {
    const operation = operations[index].split('\n\n')[0].split(' ');
    let howMany = parseInt(operation[1])
    // 2. get index of origin and destination stacks -> stack number - 1
    const originStackIndex = parseInt(operation[3]) - 1
    const destinationStackIndex = parseInt(operation[5]) - 1

    // move 5 form 4 to 7
    // we know that we have nine stack (indexes from 0 to 8)
    const temporary = []
    for ((line,idx) of lines) {
        if (line[originStackIndex] === undefined) continue

        while (howMany > 0) {
            temporary.push(line[originStackIndex])
            line[originStackIndex] = undefined
            howMany--
        }
    }
    // 5. get the first element with undefined/empty string and replace value with first form temporary stack
    // 6. if index of lines is 0 then add empty line in the beginning of lines and continue

    stacksInput
    
}