var { 
  ['@kingjs']: {
    fs: {
      rx: {
        IObservable: { Subscribe },
        IObserver: { Next },
        subject: {
          File,
          Directory
        }
      }
    }
    rx: {
      Subject,
      ProxySubject,
    },
  }
} = require('./dependencies')

var File = 'file'
var Directory = 'directory'

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

  constructor(path, ino, select) {
    var subject

    super(
      () => {
        subject = new Subject()
        subject[Subscribe](
          stats => this.inode[Next](stats),
          () => this.inodeHeap.free(inode)
        )

        return subject
      }, 
      () => {
        select(this.inode)
      }
    )

    this.ino = ino
    this.path = path
    this.inode = inode
  }

  // discriminator (abstract)
  get type() { assert.fail() }

  // compose inode
  get inode() {
    var { type, ino, inodeHeap } = this
    return this.inode = inodeHeap.allocate(type, ino)
  }
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