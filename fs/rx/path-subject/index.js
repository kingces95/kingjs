var { 
  assert,
  path: Path,
  fs: { promises: fsp }, 
  ['@kingjs']: {
    PathBuffer,
    reflect: { 
      is,
      createSymbol 
    },
    buffer: { Append },
    fs: { 
      rx: { InodeSubject }
    },
    rx: {
      Pool,
      WindowBy,
      ProxySubject,
    },
  }
} = require('./dependencies')

var { CreateSubject } = ProxySubject
var Dot = '.'
var Sep = Path.sep

/**
 * @description A `ProxySubject` which composes a `PathBuffer`.
 * 
 * @remarks For each observation, the path is checked and if its linked inode 
 * has changed then a new derivation InodeSubject is emitted after closing
 * the previously emitted InodeSubject, if any.
 * 
 * @remarks - `PathSubject.create(createSubject, activate[, isAbsolute])`
 * activates a new instance.
 * @remarks - Same with `PathSubject.createAbsolute(createSubject, activate)` 
 * @remarks - `PathSubject` supports the same properties as a `PathBuffer`
 * with the following exceptions
 * @remarks -- `parent`: Returns a parent `PathSubject`
 * @remarks -- `joinWith(name)`: Returns a `PathSubject` activated with
 * using the parent's `createSubject` and `activate`
 * @remarks -- `root`: Returns a `PathSubject`
 * 
 * ProxySubject implements ISubject
 * InodeSubject(ino) extends ProxySubject
 * DirSubject(ino) extends InodeSubject : PathSubject -> names -> PathSubjects if new paths
 * FileSubject(ino) extends InodeSubject : PathSubject -> ctime -> null if newer
 * PathSubject(name, parent) extends ProxySubject : null -> stats -> InodeSubject
 */
class PathSubject extends ProxySubject {

  static createAbsolute(createSubject) {
    return PathSubject.create(createSubject, true)
  }

  static create(
    createSubject, 
    isAbsolute) {

    var pathBuffer = PathBuffer.create(isAbsolute ? Sep : Dot)
    return new PathSubject(pathBuffer, null, createSubject)
  }

  constructor(
    pathBuffer,
    parent,
    createSubject) {

    super(createSubject, o => o
        [Pool](() => fsp.stat(this.path))
        [WindowBy](
          o => o.ino,
          (o, k) => ({ 
            path: this, 
            stats: o 
          }),
          (o, k) => InodeSubject.create(o)
        )                                                   
      )

    this.pathBuffer = pathBuffer
    this.parent = parent
  }

  joinWith(name) {
    return new this.constructor(
      this.pathBuffer.joinWith(name),
      this,
      this[CreateSubject]
    )
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

module.exports = PathSubject