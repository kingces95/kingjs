var { 
  ['@kingjs']: {
    fs: {
      rx: {
        subject: { LinkSubject }
      }
    },
    rx: { 
      Subject,
    },
  }
} = require('./dependencies')

/**
 * @description Represents a file link between a path and an inode.
 */
class FileLink extends LinkSubject {
  constructor(path, ino) {
    super(path, ino)
  }

  get inode() {
    var { ino, inodeHeap } = this
    return this.inode = inodeHeap.allocateFile(ino)
  }
}

module.exports = FileLink