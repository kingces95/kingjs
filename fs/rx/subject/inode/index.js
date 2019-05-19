var { 
  assert,
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

  constructor(ino, select) {
    super(() => new Subject(), select)
    this.ino = ino
  }
}

module.exports = InodeSubject

var FileSubject = require('@kingjs/fs.rx.subject.file')
var DirSubject = require('@kingjs/fs.rx.subject.dir')