var { 
  assert,
  ['@kingjs']: {
    rx: {
      ProxySubject,
    },
  }
} = require('./dependencies')

class InodeSubject extends ProxySubject {
  constructor(ino, createSubject, activate) {
    super(createSubject, activate)

    this.ino = ino
  }
}

module.exports = InodeSubject