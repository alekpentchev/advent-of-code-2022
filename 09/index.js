const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf-8").split("\n");

function moveAndCountVisited(data) {
  let headPosition = [0, 0];
  let tailPosition = [0, 0];

  visited = [];
  visited.push(tailPosition.join("-"));

  // iterate over the moves
  for (let idx = 0; idx < data.length; idx++) {
    const direction = data[idx].split(" ")[0];
    const steps = parseInt(data[idx].split(" ")[1]);

    for (let stepIndex = 0; stepIndex < steps; stepIndex++) {
      // move the head
      if (direction === "U") {
        headPosition = [headPosition[0], headPosition[1] + 1];
      } else if (direction === "D") {
        headPosition = [headPosition[0], headPosition[1] - 1];
      } else if (direction === "L") {
        headPosition = [headPosition[0] - 1, headPosition[1]];
      } else if (direction === "R") {
        headPosition = [headPosition[0] + 1, headPosition[1]];
      }

      const diffXAxis = headPosition[0] - tailPosition[0];
      const diffYAxis = headPosition[1] - tailPosition[1];

      if (Math.abs(diffXAxis) > 1 || Math.abs(diffYAxis) > 1) {
        const moveX = diffXAxis > 0 ? 1 : diffXAxis < 0 ? -1 : 0;
        const moveY = diffYAxis > 0 ? 1 : diffYAxis < 0 ? -1 : 0;

        tailPosition = [tailPosition[0] + moveX, tailPosition[1] + moveY]

        visited.push(tailPosition.join("-"));
      }
    }
  }
  return new Set(visited).size;
}

function moveAndCountVisitedLong(data) {
  let headPosition = [0, 0];
  let tailPosition = [0, 0];

  visited = [];
  visited.push(tailPosition.join("-"));

  // iterate over the moves
  for (let idx = 0; idx < data.length; idx++) {
    const direction = data[idx].split(" ")[0];
    const steps = parseInt(data[idx].split(" ")[1]);

    for (let stepIndex = 0; stepIndex < steps; stepIndex++) {
      // move the head
      if (direction === "U") {
        headPosition = [headPosition[0], headPosition[1] + 1];
      } else if (direction === "D") {
        headPosition = [headPosition[0], headPosition[1] - 1];
      } else if (direction === "L") {
        headPosition = [headPosition[0] - 1, headPosition[1]];
      } else if (direction === "R") {
        headPosition = [headPosition[0] + 1, headPosition[1]];
      }

      const diffXAxis = headPosition[0] - tailPosition[0];
      const diffYAxis = headPosition[1] - tailPosition[1];

      if (Math.abs(diffXAxis) > 7 || Math.abs(diffYAxis) > 7) {
        const moveX = diffXAxis > 0 ? 1 : diffXAxis < 0 ? -1 : 0;
        const moveY = diffYAxis > 0 ? 1 : diffYAxis < 0 ? -1 : 0;

        tailPosition = [tailPosition[0] + moveX, tailPosition[1] + moveY]

        visited.push(tailPosition.join("-"));
      }
    }
  }
  return new Set(visited).size;
}

// Part One
console.log(moveAndCountVisited(data));

// Part Two
console.log(moveAndCountVisitedLong(data))
