var { 
  ['@kingjs']: {
    fs: { 
      rx: {
        subject: {
          InodeSubject 
        }
      } 
    },
    rx: { 
      IObservable: { Subscribe },
    },
  }
} = require('./dependencies')

/**
 * @description Given a directory returns the directories entries.
 **/
class InodeHeap {
  constructor() {
    this.heap = { }
  }

  allocate(ino) {
    var inode = this.heap[ino]
    if (!inode) {
      inode = this.heap[ino] = InodeSubject.create(this, stats)
      inode[Subscribe](null, () => delete this.heap[ino])
    }
    return inode
  }
}

module.exports = InodeHeap