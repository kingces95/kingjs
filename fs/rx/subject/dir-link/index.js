var { 
  ['@kingjs']: {
    fs: {
      rx: {
        subject: {
          Link
        }
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
class DirLink extends Link {
  constructor(path, ino, link, unlink, activate) {
    super(path, ino, link, unlink, activate)
  }

  get isDirectory() { return true }
}

module.exports = DirLink