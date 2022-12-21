const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

const { buildTree } = require("./utils/classes");

const rootFolder = buildTree(input);

const sumOfSmallFolders = (root) => {
  let size = 0;

  for (let folder of root.folders) {
    const folderTotalSize = folder.getTotalSize();
    if (folderTotalSize <= 100000) {
      size += folderTotalSize;
    }
    size += sumOfSmallFolders(folder);
  }
  return size;
};

console.log(sumOfSmallFolders(rootFolder))