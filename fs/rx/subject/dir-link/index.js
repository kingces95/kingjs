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

  get type() { return Directory }
}

module.exports = DirLink