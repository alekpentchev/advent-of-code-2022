const fs = require('fs')

// 1.) First, we get the string input for the puzzle
const input = fs.readFileSync('input.txt', 'utf-8');

// 2.) This chain of code chunks up the input data and ultimately
// produces an ordered array of the total calories carried by
// each elf in the party

const elves = input.split('\n\n')
const summedCalories = elves
  .map(elf => {
    let sum = 0
    const elfCalories = elf.split('\n')

    for (let index = 0; index < elfCalories.length; index++) {
        sum += Number(elfCalories[index].trim())
    }

    return sum
  })
  
const sortedCalories = summedCalories
  .sort((a, b) => b-a);

const topThree = [sortedCalories[0], sortedCalories[1], sortedCalories[2]]
const topThreeCalories = topThree.reduce((total, current) => total + current, 0)
console.log('winner is: ', topThree[0], 'top 3 calories are: ', topThreeCalories)