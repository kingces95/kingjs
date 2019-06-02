var { 
  ['@kingjs']: {
    fs: {
      rx: {
        subject: {
          Link,
        }
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
class FileLink extends Link {
  constructor(path, ino, link, unlink, activate) {
    super(path, ino, link, unlink, activate)
  }

  get isFile() { return true }
}

module.exports = FileLink