var { assert,
  '@kingjs': {
    '-rx': { ProxySubject },
  }
} = module[require('@kingjs-module/dependencies')]()

class InodeSubject extends ProxySubject {
  constructor(ino, createSubject, activate) {
    super(createSubject, activate)

    this.ino = ino
  }
}

module.exports = InodeSubject