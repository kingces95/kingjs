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

var File = 'file'
var Directory = 'directory'

/**
 * @description Given a directory returns the directories entries.
 **/
class InodeHeap {
  constructor() {
    this.heap = { }
  }

  allocate(type, ino) {

    var inode = this.heap[ino]
    if (!inode) {
      this.heap[ino] = inode = activate(type, ino)
      inode[Subscribe](null, () => delete this.heap[ino])
    }

    return inode  
  }

  free(inode) {

  }
}

function activate(type, ino) {

  if (type == File)
    return new FileSubject(ino)

  if (type == Directory)
    return new DirectorySubject(ino)

  assert.fail()
}

module.exports = InodeHeap