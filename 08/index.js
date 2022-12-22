const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf-8").split("\n");

const getVisibleTrees = (data) => {
  const width = data[0].length;
  const height = data.length;

  const visible = [...Array(height).keys()].map((el) => [
    ...Array(width).keys(),
  ]);

  // let's go by rows
  for (let row_n = 0; row_n < height; row_n++) {
    // let's traverse each row entry
    let tallest = -1;
    // let's do it left-right
    for (let col_n = 0; col_n < width; col_n++) {
      const element = data[row_n][col_n];
      if (element > tallest) {
        tallest = element;
        visible[row_n][col_n] = true;
      }
    }
    // let's do it right-left
    tallest = -1;
    for (let col_n = width - 1; col_n > 0; col_n--) {
      const element = data[row_n][col_n];
      if (element > tallest) {
        tallest = element;
        visible[row_n][col_n] = true;
      }
    }
  }

  // let's go by columns
  for (let col_n = 0; col_n < width; col_n++) {
    // let's go top-bottom
    let tallest = -1;
    for (let row_n = 0; row_n < height; row_n++) {
      const element = data[row_n][col_n];
      if (element > tallest) {
        tallest = element;
        visible[row_n][col_n] = true;
      }
    }

    // // let's go bottom-up
    tallest = -1;
    for (let row_n = height - 1; row_n > 0; row_n--) {
      const element = data[row_n][col_n];
      if (element > tallest) {
        tallest = element;
        visible[row_n][col_n] = true;
      }
    }
  }

  return visible
    .reduce((acc, val) => acc.concat(val), [])
    .reduce((acc, val) => (val === true ? acc + 1 : acc), 0);
};

console.log(getVisibleTrees(data));

// reduce 2D array to 1D array
const flatten = (arr) => arr.reduce((acc, val) => acc.concat(val), []);