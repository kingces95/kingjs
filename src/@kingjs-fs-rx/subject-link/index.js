var { 
  ['@kingjs']: {
    fs: {
      rx: { 
        subject: {
          Dir, File
        }
      }
    },
    rx: {
      ConferenceSubject,
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
class LinkSubject extends ConferenceSubject {

  constructor(pathSubject, inodeType, ino, link, unlink, activate) {
    super(ino, link, unlink, activate)

    this.inodeType = inodeType
    this.ino = ino
    this.pathSubject = pathSubject
  }

  get isDirectory() { return this.inodeType == Dir }
  get isFile() { return this.inodeType == File }

  // compose path
  get buffer() { return this.pathSubject.buffer }
  get name() { return this.pathSubject.name }
  get path() { return this.pathSubject.path }
  get pathAsDir() { return this.pathSubject.pathAsDir }
  get dir() { return this.pathSubject.dir }
  get bufferAsDir() { return this.pathSubject.bufferAsDir }
  get isAbsolute() { return this.pathSubject.isAbsolute }

  toString() { return this.pathSubject.toString() }
}

module.exports = LinkSubject