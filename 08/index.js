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
    .reduce((acc, val) => acc.concat(val), []) // flatten the array
    .reduce((acc, val) => (val === true ? acc + 1 : acc), 0); // count the trues
};

function getTreeHighestScore(data) {
  const width = data[0].length;
  const height = data.length;

  // map 2d array to 2d array with only zeros
  const transformArrayTo4DScore = (data) => {
    const width = data[0].length;
    const height = data.length;
    return [...Array(height).keys()].map((el) =>
      [...Array(width).keys()].map((el) => [...Array(4).keys()].map(el => 1))
    );
  }; // returns [...[1,1,1,1]] which corresponds to scores for [...[left,right,top,bottom]] directions

  const treeScores = transformArrayTo4DScore(data);
  // let's go by rows
  for (let row_n = 0; row_n < height; row_n++) {
    // let's traverse each row entry
    let tallest_coords = [0, 0];
    let tallest_value = -1;
    // let's do it left-right
    for (let col_n = 0; col_n < width; col_n++) {
      const element = data[row_n][col_n];
      if (element > tallest_value) {
        treeScores[row_n][col_n][0] += 1;
        tallest_coords = [row_n, col_n];
        tallest_value = element;
      } else {
        treeScores[tallest_coords[0]][tallest_coords[1]][0] += 1
      }
    }
    // let's do it right-left
    tallest_coords = [0, 0];
    tallest_value = -1;
    for (let col_n = width - 1; col_n > 0; col_n--) {
      const element = data[row_n][col_n];
      if (element > tallest_value) {
        tallest_coords = [row_n, col_n];
        tallest_value = element;
        treeScores[row_n][col_n][1] += 1;
      } else {
       treeScores[tallest_coords[0]][tallest_coords[1]][1] += 1
      }
    }
  }

  // let's go by columns
  for (let col_n = 0; col_n < width; col_n++) {
    // let's go top-bottom
    let tallest_coords = [0, 0];
    let tallest_value = 0;
    for (let row_n = 0; row_n < height; row_n++) {
      const element = data[row_n][col_n];
      if (element > tallest_value) {
        tallest_coords = [row_n, col_n];
        tallest_value = element;
        treeScores[row_n][col_n][2] += 1;
      } else {
       treeScores[tallest_coords[0]][tallest_coords[1]][2] += 1
      }
    }

    // let's go bottom-up
    tallest_coords = [0, 0];
    tallest_value = -1;
    for (let row_n = height - 1; row_n > 0; row_n--) {
      const element = data[row_n][col_n];
      if (element > tallest_value) {
        tallest_coords = [row_n, col_n];
        tallest_value = element;
        treeScores[row_n][col_n][3] += 1;
      } else {
        treeScores[tallest_coords[0]][tallest_coords[1]][3] += 1
      }
    }
  }
  
  const flattened =  treeScores
  .reduce((acc, val) => acc.concat(val), []) // flatten the array
  .map(tree => tree.reduce((acc, val) => acc * val, 1))
  // get max value of array
  return Math.max(...flattened);
}

// Part 1
console.log(getVisibleTrees(data));
// Part 2
console.log(getTreeHighestScore(data));