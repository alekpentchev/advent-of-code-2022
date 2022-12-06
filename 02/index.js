const fs = require("fs");

// 1.) First, we get the string input for the puzzle
const input = fs.readFileSync("input.txt", "utf-8");
const rounds = input.split("\n");

// A - rock B - paper C - scissors
// Y - Paper X - Rock Z - Scissors
// Paper + 2, Rock + 1, Scissors + 3
// Win + 6, Draw + 3, Lose + 0

const data = {
  A: {
    X: 4,
    Y: 8,
    Z: 3,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  },
};

function calculateScore(rounds, matrix) {
  let score = rounds
    .reduce((total, current) => {
      const choices = current.split(" ");
      const currentFormatted = matrix[choices[0]][choices[1]];
      return total + currentFormatted
    }, 0);
  return score;
}

console.log(calculateScore(rounds, data));

const data2 = {
    // A - rock B - paper C - scissors
    // Paper + 2, Rock + 1, Scissors + 3
    // X - lose, Y - draw, z - win
    // Lose -0 , draw +3, win +6
  A: {
    X: 3,
    Y: 4,
    Z: 8,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7,
  },
};

console.log('new score is: ', calculateScore(rounds, data2))