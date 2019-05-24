var { 
  assert,
  ['@kingjs']: {
    rx: {
      ProxySubject,
    },
  }
} = require('./dependencies')

class InodeSubject extends ProxySubject {
  constructor(ino, activate) {
    super(undefined, activate)

    this.ino = ino
  }
}

module.exports = InodeSubject