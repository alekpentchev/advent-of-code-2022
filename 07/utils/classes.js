class Folder {
  constructor(name, parent = null) {
    this.name = name;
    this.files = [];
    this.folders = [];
    this.isRoot = parent ? false : true;
    this.parent = parent;
    this.hasChildren = false;
    this.size = 0;
    this.totalSize = 0;
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
    for (file of this.files) {
      this.size += file.getSize();
    }
    return this.size;
  }

  getTotalSize() {
    this.size = this.getSize();
    this.totalSize = this.size;
    for (folder of this.folders) {
      this.totalSize += folder.getTotalSize();
    }
  }

  getParent() {
    return this.isRoot ? null : this.parent;
  }

  getFolders() {
    return this.folders;
  }

  getTotalFolders() {
    if (!this.hasChildren) return [];

    const totalFolders = []
    for (folder of this.folders) {
        totalFolders.push(folder)
        if (folder.hasChildren) {
            totalFolders += folder.getTotalFolders()
        }
    }

    return totalFolders
  }

  getChildren() {
    return [...this.files, ...this.folders];
  }
}


class File {
    constructor(rawName, parentFolder) {
        this.name = rawName.split(' ')[1]
        this.size = rawName.split(' ')[0]
        this.parent = parentFolder
    }
}

function buildTree(inputData) {
    rootFolder = new Folder('root')
    currentFolder = rootFolder

    for (line of inputData) {
        // it will be a command
        if (line.startsWith('$')) {
            // it will be a cd command - go to folder
            if (line.startsWith('$ cd')) {
                // it will be a cd command - go to upper directory
                if (line.startsWith('$ cd ..')) {
                    currentFolder = currentFolder.getParent()
                } else {
                    const folderName = line.split(' ')[2].replace("\n", "")
                    for (folder of currentFolder.getFolders()) {
                        // move to the another folder from the parent folder
                        if (folder.name === folderName) {
                            currentFolder = folder
                            break
                        }
                    }
                }
            }
        } else {
            // it will be a command - new directory, create it
            if (line.startsWith('dir')) {
                const folderName = line.split(' ')[1].replace("\n", "")
                const newFolder = new Folder(folderName, currentFolder)
                currentFolder.addFolder(newFolder)
            } else {
                const newFile = new File(line, currentFolder)
                currentFolder.addFile(newFile)
            }
        }
    }

    return rootFolder
}

module.exports = { Folder, File, buildTree }    
