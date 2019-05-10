var { 
  ['@kingjs']: {
    rx: { 
      Subject,
    },
  }
} = require('./dependencies')

class StatSubject extends Subject {
  constructor(path, stats) {
    super()

    // id
    this.path = path
    this.ino = stats.id;

    // type
    this.isBlockDevice = stats.isBlockDevice()
    this.isCharacterDevice = stats.isCharacterDevice()
    this.isDirectory = stats.isDirectory()
    this.isFIFO = stats.isFIFO()
    this.isFile = stats.isFile()
    this.isSocket = stats.isSocket()
    this.isSymbolicLink = stats.isSymbolicLink()
  }
}

module.exports = StatSubject