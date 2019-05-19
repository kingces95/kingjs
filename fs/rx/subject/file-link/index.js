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

  constructor(
    path, 
    inode) {
    super(path, inode)
  }
}

module.exports = FileLink