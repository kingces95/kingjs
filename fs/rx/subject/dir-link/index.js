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
  constructor(path, ino, link, unlink) {
    super(path, ino, link, unlink)
  }
}

module.exports = DirLink