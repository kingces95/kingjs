var { 
  ['@kingjs']: {
    rx: {
      Subject,
      ProxySubject,
    },
  }
} = require('./dependencies')

class InodeSubject extends ProxySubject {
  static create(stats) {
    if (stats.isFile())
      return new FileSubject(stats)

    if (stats.isDirectory())
      return new DirSubject(stats)

    assert.fail()
  }

  constructor(stats, select) {
    super(() => new Subject(), select)

    // id
    this.ino = stats.ino

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

module.exports = InodeSubject

var FileSubject = require('@kingjs/fs.rx.file-subject')
var DirSubject = require('@kingjs/fs.rx.dir-subject')