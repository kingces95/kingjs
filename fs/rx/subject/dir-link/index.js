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

var Directory = 'directory'

/**
 * @description Represents a directory link between a path and an inode.
 */
class DirLink extends LinkSubject {

  constructor(
    path, 
    inode) {
    super(path, inode)
  }

  get inode() {
    var { ino, inodeHeap } = this
    return this.inode = inodeHeap.allocateDir(ino)
  }
}

module.exports = DirLink