var { 
  ['@kingjs']: {
    fs: {
      rx: {
        subject: {
          Link,
          File
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
  constructor(path, ino, link, unlink) {
    super(path, ino, link, unlink)
  }
}

module.exports = FileLink