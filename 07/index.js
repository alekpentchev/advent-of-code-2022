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

const getFolderToDelete = (root) => {
    const FREE_SPACE = 70000000
    const SPACE_NEEDED = 30000000

    const allFolders = root.getTotalFolders()

    let totalSize = 0
    for (let folder of allFolders) {
        totalSize += folder.getSize()
    }
    const availableFreeSpace = FREE_SPACE - totalSize
    const spaceNeededToBeFreed = SPACE_NEEDED - availableFreeSpace

    currentFolderToDelete = root

    for (let folder of allFolders) {
        const folderTotalSize = folder.getTotalSize()
        if (folderTotalSize >= spaceNeededToBeFreed) {
            if (folderTotalSize < currentFolderToDelete.getTotalSize()) {
                currentFolderToDelete = folder
            }
        }
    }

    // TODO: this code still returns an incorrect number
    return [currentFolderToDelete, currentFolderToDelete.getTotalSize()]
}

console.log(sumOfSmallFolders(rootFolder))
console.log('smallest folder to be deleted: ', getFolderToDelete(rootFolder))
