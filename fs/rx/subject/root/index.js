var { 
  ['@kingjs']: {
    PathBuffer,
    fs: { 
      rx: {
        InodeHeap,
        subject: {
          StatsSubject: Stats
        }
      } 
    },
  }
} = require('./dependencies')

/**
 * @description Given a directory returns the directories entries.
 **/
class RootSubject extends StatsSubject {
  constructor(path, createSubject) {
    super(PathBuffer.create(path), createSubject)
    this.inodeHeap = new InodeHeap()
  }

  get root() { return this }
}

module.exports = RootSubject