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
 * @description Represents a directory link between a path and an inode.
 */
class DirLink extends LinkSubject {

  constructor(
    path, 
    inode) {
    super(path, inode)
  }
}

module.exports = DirLink