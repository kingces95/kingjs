var { 
  assert,
  path: Path,
  ['@kingjs']: {
    reflect: { 
      is,
      createSymbol 
    },
    buffer: { Append },
    rx: { 
      ProxySubject,
    },
  }
} = require('./dependencies')

var { Activate, CreateSubject } = ProxySubject;

var CurrentDir = '.'
var CurrentDirBuffer = Buffer.from(CurrentDir)

var Sep = Buffer.from(Path.sep)
var RootPath

class PathSubject extends ProxySubject {

  static get Root() {
    if (!RootPath)
      RootPath = new PathSubject()
    return RootPath
  }

  constructor(
    basename = CurrentDir,
    parent,
    createSubject,
    activate) {
    super(createSubject, activate)

    assert(is.string(basename))

    basename = Path.normalize(basename)
    assert(basename == Path.basename(basename))
    
    if (basename == CurrentDir) {
      assert(!parent)

      this.isRoot = true
      this.parent = null
      this.basename = CurrentDir
      this.buffer = CurrentDirBuffer
      return
    }

    if (!parent)
      parent = PathSubject.Root

    this.basename = basename
    this.parent = parent

    var buffer = Buffer.from(this.basename)
    if (!this.parent.isRoot)
      buffer = parent.buffer[Append](Sep, buffer)
    this.buffer = buffer
  }

  create(name) {
    return new this.constructor(
      name, 
      this, 
      this[CreateSubject], 
      this[Activate]
    )
  }

  get path() {
    return this.buffer.toString()
  }
  
  get dir() {
    assert(!this.isRoot)
    return this.parent.path
  }

  toString() {
    return this.path
  }
}

Object.defineProperties(PathSubject.prototype, {
  path: { enumerable: true },
  dir: { enumerable: true },
})

module.exports = PathSubject