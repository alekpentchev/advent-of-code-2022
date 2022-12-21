const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

const { Folder, File, buildTree } = require("./utils/classes");

const tree = buildTree(input)
console.log(tree)

