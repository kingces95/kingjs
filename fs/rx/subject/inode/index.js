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
  static create(ino, type) {
    if (type == 'file')
      return new FileSubject(ino)

    if (type == 'directory')
      return new DirSubject(ino)

    assert.fail()
  }

  constructor(ino, select) {
    super(null, select)

    this.ino = ino
  }
}

module.exports = InodeSubject

var FileSubject = require('@kingjs/fs.rx.subject.file')
var DirSubject = require('@kingjs/fs.rx.subject.dir')