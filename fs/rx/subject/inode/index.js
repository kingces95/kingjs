var { 
  assert,
  ['@kingjs']: {
    rx: {
      BehaviorSubject,
    },
  }
} = require('./dependencies')

class InodeSubject extends BehaviorSubject {
  constructor(ino, activate) {
    super(activate)

    this.ino = ino
  }
}

module.exports = InodeSubject