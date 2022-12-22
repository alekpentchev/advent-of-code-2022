const fs = require("fs")
const input = fs.readFileSync("input.txt", "utf-8")
const { createStack } = require("./stack.js")

let crate = ""
let crane = ""
let result = ""

function movements(stack) {
  input.split(/\r?\n/).forEach(line => {
    if (line[0] == "m") { // example: move 1 from 4 to 1
      let details = line.split(" ")
      let quantity = details[1] // how many crates to move
      let from = details[3] // from where
      let to = details[5] // to where
      for (i = 0; i < quantity; i++) {
        // console.log(stack[from-1])
        crate = stack[from-1].shift() // remove from top of current row
        if (crate !== "" || crate !== undefined) {
          crane += crate // add crates to crane
          crate = "" // reset
        }
        if (i == quantity -1) { // when full, add crane to stack
          crane = crane.split("").reverse().join("") // reverse order of crane before adding to new stack
          crane.split("").forEach(crate => {
            stack[to-1].unshift(crate) // add to top of new row
          })
          crane = "" // reset
        }
      }
    }
  })
  for (i = 0; i < stack.length; i++) { // get top crate from each row
    result += stack[i].shift()
  }
  console.log("Answer", result)
}

movements(createStack())