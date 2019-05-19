var { 
  ['@kingjs']: {
    rx: { 
      Subject,
    },
  }
} = require('./dependencies')

/**
 * @description Represents the link between a path and an inode.
 * 
 * @remarks For each observation, the link is checked and if its 
 * changed then the previously emitted InodeSubject, if any, is
 * closed and a new derivation InodeSubject is emitted.
 */
class LinkSubject extends Subject {

  constructor(
    path, 
    inode) {
    super()

    this.inode = inode
    this.path = path
  }

  get root() { return this.isRoot ? this : this.parent.root }

  // compose PathBuffer
  get isRoot() { return this.pathBuffer.isRoot }
  get buffer() { return this.pathBuffer.buffer }
  get name() { return this.pathBuffer.name }
  get path() { return this.pathBuffer.path }
  get pathAsDir() { return this.pathBuffer.pathAsDir }
  get dir() { return this.pathBuffer.dir }
  get bufferAsDir() { return this.pathBuffer.bufferAsDir }
  get isAbsolute() { return this.pathBuffer.isAbsolute }

  toString() { return this.pathBuffer.toString() }  
}

module.exports = LinkSubject