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

var File = 'file'

/**
 * @description Represents a file link between a path and an inode.
 */
class FileLink extends LinkSubject {
  constructor(path, ino) {
    super(path, ino)
  }

  get type() { return File }
}

module.exports = FileLink