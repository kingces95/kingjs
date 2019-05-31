var { 
  ['@kingjs']: {
    fs: {
      rx: {
        subject: {
          File,
          Dir
        }
      }
    },
    rx: {
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
      Subject,
      ProxySubject,
    },
  }
} = require('./dependencies')

var throwNextTick = x => process.nextTick(() => { throw x })
var Noop = () => undefined

/**
 * @description Represents the link between a path and an inode.
 * 
 * @remarks For each observation, the link is checked and if its 
 * changed then the previously emitted InodeSubject, if any, is
 * closed and a new derivation InodeSubject is emitted.
 */
class LinkSubject extends ProxySubject {

  constructor(path, ino, link, unlink) {
    super(
      () => link(ino), 
      inode => {
        var subject = new Subject()
        var unsubscribe = inode[Subscribe](subject)

        this.dispose = () => {
          unsubscribe()
          unlink(inode)
          subject[Complete]()
        }

        return subject
      }
    )

    this.dispose = Noop
    this.ino = ino
    this.path = path
  }

  [Complete]() { this.dispose() }
  [Error](e) { throwNextTick(e) }

  // compose path
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