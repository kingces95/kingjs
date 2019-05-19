var { 
  ['@kingjs']: {
    PathBuffer,
    fs: { 
      rx: { 
        subject: { Path: PathSubject }
      }
    },
    rx: {
      ProxySubject,
    },
  }
} = require('./dependencies')

var { CreateSubject } = ProxySubject

/**
 * @description A `ProxySubject` which composes a `PathBuffer`.
 */
class StatsSubject extends PathSubject {

  constructor(
    name,
    createSubject,
    parent) {

    super(name, parent, createSubject, o => o
      [Pool](() => fsp.stat(this.buffer))
      [WindowBy](
        x => x.ino,
        (x, k) => x,
        (x, k) => LinkSubject.create(this, k)
      )                                                   
    )
  }

  joinWith(name) {
    return new StatsSubject(
      name, 
      this,
      this[CreateSubject]
    )
  }
}

module.exports = StatsSubject