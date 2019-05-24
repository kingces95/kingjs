var { 
  ['@kingjs']: {
    fs: {
      rx: {
        IObservable: { Subscribe },
        IObserver: { Next, Complete, Error },
        subject: {
          File,
          Directory
        }
      }
    },
    rx: {
      Subject,
      ProxySubject,
    },
  }
} = require('./dependencies')

var File = 'file'
var Directory = 'directory'
var throwNextTick = x => process.nextTick(() => { throw x })

/**
 * @description Represents the link between a path and an inode.
 * 
 * @remarks For each observation, the link is checked and if its 
 * changed then the previously emitted InodeSubject, if any, is
 * closed and a new derivation InodeSubject is emitted.
 */
class LinkSubject {

  async static create(path, type, ino) {
    if (type == File)
      return new FileSubject(path, ino)

    if (type == Directory)
      return new DirectorySubject(path, ino)

    assert.fail()
  }

  constructor(path, ino) {
    super(
      () => this.inode, 
      inode => {
        var subject = new Subject()
        var unsubscribe = inode[Subscribe](subject)

        this.dispose = () => {
          unsubscribe()
          this.inodeHeap.free(inode)
          subject[Complete]()
        }

        return subject
      }
    )

    this.ino = ino
    this.path = path
  }

  [Complete]() {
    if (!this.dispose)
      return
    dispose()
  }

  [Error](e) {
    throwNextTick(e)
  }

  // discriminator (abstract)

  // compose inode
  get inode() { assert.fail() } // abstract
  get isFile() { return this.inode.isFile }
  get isDirectory() { return this.inode.isDirectory }

  // compose path
  get inodeHeap() { return this.path.root.inodeHeap }
  get buffer() { return this.path.buffer }
  get name() { return this.path.name }
  get path() { return this.path.path }
  get pathAsDir() { return this.path.pathAsDir }
  get dir() { return this.path.dir }
  get bufferAsDir() { return this.path.bufferAsDir }
  get isAbsolute() { return this.path.isAbsolute }

  toString() { return this.path.toString() }
}

module.exports = LinkSubject