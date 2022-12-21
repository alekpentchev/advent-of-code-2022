class Folder {
  constructor(name, parent = null) {
    this.name = name;
    this.files = [];
    this.folders = [];
    this.isRoot = parent ? false : true;
    this.parent = parent;
    this.hasChildren = false;
  }

  addFile(file) {
    this.files.push(file);
    this.hasChildren = true;
  }

  addFolder(folder) {
    this.folders.push(folder);
    this.hasChildren = true;
  }

  getSize() {
    let size = 0
    for (let file of this.files) {
      size += file.getSize();
    }
    return size;
  }

  getTotalSize() {
    let size = this.getSize();
    for (let folder of this.folders) {
      size += folder.getTotalSize();
    }
    return size;
  }

  getParent() {
    return this.isRoot ? null : this.parent;
  }

  getTotalFolders() {
    if (!this.hasChildren) return [];

    let totalFolders = [];
    for (let folder of this.folders) {
      totalFolders.push(folder);
      if (folder.hasChildren) {
        totalFolders = [...totalFolders, folder.getTotalFolders()];
      }
    }

    return totalFolders;
  }

  getChildren() {
    return [...this.files, ...this.folders];
  }
}

class File {
  constructor(rawName, parentFolder) {
    this.name = rawName.split(" ")[1];
    this.size = parseInt(rawName.split(" ")[0]);
    this.parent = parentFolder;
  }

  getSize() {
    return this.size;
  }
}

function buildTree(inputData) {
  rootFolder = new Folder("root");
  currentFolder = rootFolder;

  for (let line of inputData) {
    // it will be a command
    if (line.startsWith("$")) {
      // it will be a cd command - go to folder
      if (line.startsWith("$ cd")) {
        // it will be a cd command - go to upper directory
        if (line.startsWith("$ cd ..")) {
          currentFolder = currentFolder.getParent();
        } else {
          const folderName = line.split(" ")[2].replace("\n", "");
          for (let folder of currentFolder.folders) {
            // move to the another folder from the parent folder
            if (folder.name === folderName) {
              currentFolder = folder;
              break;
            }
          }
        }
      }
    } else {
      // it will be a command - new directory, create it
      if (line.startsWith("dir")) {
        const folderName = line.split(" ")[1].replace("\n", "");
        const newFolder = new Folder(folderName, currentFolder);
        currentFolder.addFolder(newFolder);
      } else {
        const newFile = new File(line, currentFolder);
        currentFolder.addFile(newFile);
      }
    }
  }

  return rootFolder;
}

module.exports = { Folder, File, buildTree };
