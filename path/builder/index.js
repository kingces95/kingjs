var { 
  assert,
  Path,
  ['@kingjs']: {
    reflect: { is },
    buffer: { Append },
  }
} = require('./dependencies')

var EmptyString = ''
var Dot = '.'
var DotDot = '..'
var Sep = Path.sep

var SepBuffer = Buffer.from(Sep)
var DotBuffer = Buffer.from(Dot)
var DotDotBuffer = Buffer.from(DotDot)

var Cwd
var Root
var Parent

/**
 * @description An working set efficient representation of paths. 
 * 
 * @remarks - `PathBuilder.Pwd`: A `PathBuilder` representing a relative path
 * @remarks - `PathBuilder.Root`: A `PathBuilder` representing an absolute path
 * @remarks - `PathBuilder.create(path)`: Activate a new `PathBuilder`
 * @remarks - `PathBuilder` supports the following methods and properties
 * @remarks -- `buffer`: Returns a `Buffer` representation of the path
 * @remarks -- `to(name)`: Returns a new `PathBuilder` with joined with `name`
 * @remarks -- `name` : Returns the last segment of the `PathBuilder`
 * @remarks -- `path` : The path as a string
 * @remarks -- `isRoot` : `true` if path is `/`
 * @remarks -- 'isCwd' : `true` if path is `.`
 * @remarks -- `isAbsolute` : `true` if the path is absolute
 * @remarks -- `isRelative` : `true` if the path is relative
 */
class PathBuilder {

  static get Cwd() {
    if (!Cwd) 
      Cwd = new CwdPathBuilder() 
    return Cwd
  }

  static get Parent() {
    if (!Parent) 
      Parent = new ParentPathBuilder() 
    return Parent
  }

  static get Root() { 
    if (!Root) 
      Root = new RootPathBuilder() 
    return Root  
  }

  static create(path) {
    if (path instanceof PathBuilder)
      return path

    if (path == EmptyString || path == Dot)
      return this.Cwd

    if (path == Sep)
      return this.Root

    var dir = Path.dirname(path)
    var result = this.create(dir)

    var name = Path.basename(path)
    if (name == Dot)
      return result

    if (name == DotDot)
      return result.dir

    return result._to(name)
  }

  constructor(parent, name, buffer) {
    this._parent = parent
    this.name = name
    this.buffer = buffer
  }

  get __path() { 
    return this.toString() 
  }

  _to(name) {
    return new SegmentPathBuilder(this, name, this.buffer[Append](SepBuffer, name))
  }

  get ext() {
    return Path.extname(this.name)
  }

  get basename() {
    return Path.basename(this.name, this.ext)
  }

  to(path) {

    if (is.string(path)) {

      if (path == Dot)
        return this

      if (path == DotDot)
        return this.dir

      if (path.indexOf(Sep) == -1)
        return this._to(path)

      return this.to(PathBuilder.create(path))
    }
  
    assert(path instanceof PathBuilder)

    if (path.isAbsolute)
      return path
    
    if (path.isCwd)
      return this

    var result = this
    if (path._parent)
      result = result.to(path._parent)

    if (path.isRelativeParent)
      return result.dir

    return result._to(path.name)
  }

  equals(other) {
    if (this == other)
      return true

    if (this.name != other.name)
      return false

    // '..' != '../..'; for this reason, _parent should be exposed
    if (!this._parent || !other._parent)
      return false

    return this._parent.equals(other._parent)
  }

  toString() {
    return this.buffer.toString()
  }
}

class SegmentPathBuilder extends PathBuilder {
  constructor(parent, name, buffer) {
    super(parent, name, buffer)
  }

  _to(name) {
    return super._to(name)
  }

  get dir() {
    return this._parent;
  }

  get isSegment() {
    return true
  }

  get isAbsolute() {
    return this._parent.isAbsolute
  }

  get isRelative() {
    return this._parent.isRelative
  }
}

class ParentPathBuilder extends PathBuilder {
  constructor(parent) {
    assert(!parent || parent instanceof ParentPathBuilder)
    super(parent, DotDot, parent ? parent.buffer[Append](SepBuffer, DotDotBuffer) : DotDotBuffer)
  }

  _to(name) {
    return super._to(name)
  }
  
  get dir() {
    return new ParentPathBuilder(this)
  }

  get isRelative() {
    return true
  }

  get isRelativeParent() {
    return true
  }
}

class RootPathBuilder extends PathBuilder {
  constructor() {
    super(null, Sep, SepBuffer)
  }

  _to(name) {
    return new SegmentPathBuilder(this, name, this.buffer[Append](name))
  }

  get dir() {
    throw "Cannot navigate from '/' to '..'."
  }

  get isRoot() {
    return true
  }

  get isAbsolute() {
    return true
  }
}

class CwdPathBuilder extends PathBuilder {
  constructor() {
    super(null, Dot, DotBuffer)
  }

  _to(name) {
    return new SegmentPathBuilder(this, name, Buffer.from(name))
  }

  get dir() {
    return PathBuilder.Parent;
  }

  get isCwd() {
    return true
  }

  get isRelative() {
    return true
  }
}

module.exports = PathBuilder