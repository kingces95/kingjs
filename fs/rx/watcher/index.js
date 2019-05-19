var { 
  ['@kingjs']: {
    PathBuffer,
    fs: { 
      rx: {
        InodeHeap,
        PathSubject,
      } 
    },
  }
} = require('./dependencies')

/**
 * @description Given a directory returns the directories entries.
 **/
class Watcher {
  constructor() {
    this.heap = new InodeHeap()
    this.createSubject
  }

  get pwd() {
    var pathBuffer = PathBuffer.create()
    var pathSubject = PathSubject.create(this, pathBuffer)
    return this.pwd = pathSubject
  }
}

module.exports = Watcher