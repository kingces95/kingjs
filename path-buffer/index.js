var { 
  assert,
  path: Path,
  ['@kingjs']: {
    reflect: { is },
    buffer: { Append },
  }
} = require('./dependencies')

var EmptyString = ''
var Dot = '.'
var Sep = Path.sep

var EmptyBuffer = Buffer.from(EmptyString)
var SepBuffer = Buffer.from(Sep)

class PathBuffer {

  static create(path = EmptyString) {
    var { name, dir } = Path.parse(path)

    // normalize
    if (name == Dot)
      name = EmptyString
    if (dir == Dot)
      dir == EmptyString

    if (!name) {
      assert(dir == EmptyString || dir == Sep)
      return new PathBuffer(dir === Sep)
    }

    return this.create(dir).create(name)
  }

  constructor(nameOrIsAbsolute, parent) {
    if (!parent) {
      assert(is.boolean(nameOrIsAbsolute))
      this.isAbsolute = nameOrIsAbsolute
      this.name = this.isAbsolute ? Sep : EmptyString
      this.buffer = this.isAbsolute ? SepBuffer : EmptyBuffer
      this.root = this
      this.isRoot = true
    }
    else {
      assert(is.string(nameOrIsAbsolute))
      var name = nameOrIsAbsolute
      this.buffer = parent.buffer[Append](SepBuffer, Buffer.from(name))
      this.name = name
      this.parent = parent
      this.isRoot = false
      this.root = this.parent.root
      this.isAbsolute = this.parent.isAbsolute
    }

    this.isRelative = !this.isAbsolute
  }

  create(name) {
    return new this.constructor(name, this)
  }

  get path() {
    return this.buffer.toString()
  }
  
  get dir() {
    if (this.isRoot)
      return undefined;
    return this.parent.path
  }

  toString() {
    return this.path
  }
}

module.exports = PathBuffer