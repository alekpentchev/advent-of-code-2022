const pathModule = require("path");
const fs = require("fs");

const data = fs
  .readFileSync(pathModule.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let root;
let dest;
for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[0].length; x++) {
    if (data[y][x] === "S") {
      root = { x, y };

      data[y][x] = "a";
    } else if (data[y][x] === "E") {
      dest = { x, y };

      data[y][x] = "z";
    }

    const cell = data[y][x];

    data[y][x] = cell.charCodeAt(0);
  }
}

const getId = (x, y) => `${x},${y}`;

function getNeighbors(x, y) {
  return [
    { x: x, y: y - 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x, y: y + 1 },
  ].filter((coord) => typeof data[coord.y]?.[coord.x] !== "undefined");
}

function getShortestPath(rootX, rootY, destX, destY) {
  const rootId = getId(rootX, rootY);
  const destId = getId(destX, destY);
  const visitedMap = new Map();
  const queue = [];

  queue.push({ x: rootX, y: rootY });
  visitedMap.set(getId(rootX, rootY), null);

  while (queue.length > 0) {
    const current = queue.shift();
    const current_val = data[current.y][current.x];

    let neighbors = getNeighbors(current.x, current.y);
    for (let neighbor of neighbors) {
      const nextCell = data[neighbor.y][neighbor.x];
      const nextId = getId(neighbor.x, neighbor.y);

      if (nextCell - current_val > 1 || visitedMap.has(nextId)) {
        continue;
      }

      const currentId = getId(current.x, current.y);
      queue.push(neighbor);
      visitedMap.set(nextId, currentId);
    }
  }

  let current = destId;
  let path = [];
  
  while (current !== undefined && current !== rootId) {
    path.push(current);
    current = visitedMap.get(current);
  }

  if (current === undefined) {
    return [];
  }

  path.reverse();

  return path;
}

const path = getShortestPath(root.x, root.y, dest.x, dest.y);
console.log("Part one:", path.length);
