const fs = require("fs")
const input = fs.readFileSync("input.txt", "utf-8")

let stack = [[], []] // create empty array of arrays
let counter = 1 // rather than 0
let first = true // only needed for first row

function createStack() {
  input.split(/\r?\n/).forEach(line => {
    counter = 1 // reset counter
    if (line[0] !== "m") { // ignore movements lines
      for (c = 0; c < line.length; c+=4) { // c+=4 each column is 4 characters wide
        if (line[c+1] !== " " && isNaN(Number(line[c+1]))) { // ignore empty and numbered lines
          stack[counter].push(line[c+1]) // add crate
        }
        if (first) stack.push([]) // create a new empty column
        counter++
      }
      !first
    }
  })
  let stackFiltered = stack.filter(e => { // remove empty crates
    return e != null && e != '' && e != []
  })
  return stackFiltered
}

module.exports = { createStack } // for use in part 1 & 1 puzzles