var {
  assert,
  Path,
  ['@kingjs']: {
    Exception,
    stringEx: { Builder: StringBuilder },
    pojo: { ToArray },
    reflect: { is },
    buffer: { Append },
  }
} = require('./dependencies')

var NoRelativePathExists = "No relative path exists from '${from}' to '${to}'."

var EmptyString = ''
var Dot = '.'
var DotDot = '..'

var EmptyBuffer = Buffer.from(EmptyString)
var DotBuffer = Buffer.from(Dot)
var DotDotBuffer = Buffer.from(DotDot)

class NoRelativePathExistsException extends Exception {
  constructor(from, to) {
    from = from.toString()
    to = to.toString()

    super(NoRelativePathExists, { from, to })
  }
}

/**
 * @description An working set efficient representation of paths. 
 * 
 * @remarks - Static methods
 * @remarks -- createRelative(sepBuffer)
 * @remarks -- createRoot(sepBuffer, prefixBuffer)
 * 
 * @remarks - Instance methods
 * @remarks -- `isRoot` : path is rooted
 * @remarks -- `isDot` : path is `.` 
 * @remarks -- `isDotDot` : path is `..`
 * @remarks -- `isAbsolute` : path is absolute
 * @remarks -- `isRelative` : path is relative
 * @remarks -- `isNamed` : path has `name`; path is not `.`, `..`, or root
 * @remarks -- `name` : the last segment of the path
 * @remarks -- `ext` : the extension with `.` of `name`
 * @remarks -- `basename` : `name` without `ext`
 * @remarks -- `dir` : the parent directory of the path; `.` -> `..`
 * @remarks -- `parent`: returns the parent of the path; `.` -> null
 * @remarks -- `to(name)`: returns a new path with `name` appended
 * @remarks -- `toRelative(target)`: returns a relative path to `target`
 * @remarks -- `buffer`: `toString` as a `Buffer`
 * @remarks -- `sepBuffer`: the path separator
 * @remarks -- `prefixBuffer`: the prefix to the path root. e.g. `c:`
 */
class PathBuilder {

  static createRelative(sepBuffer) {
    return new DotPathBuilder(sepBuffer)
  }

  static createRoot(sepBuffer, prefixBuffer) {
    return new RootPathBuffer(sepBuffer, prefixBuffer)
  }

  constructor() { }

  get __toString() {
    return this.toString()
  }

  _to(name) {
    return new NamedPathBuilder(this, name)
  }

  toRelativeFile(target, ignoreSeparator) {
    var sourceDir = this.dir
    var targetDir = target.dir
    var link = sourceDir.toRelative(targetDir, ignoreSeparator)
    return link.to(target.name)
  }

  toRelative(target, ignoreSeparator) {
    assert(target instanceof PathBuilder)
    assert(this.isRelative == target.isRelative)

    var source = this

    // keep it simple...
    var sourceParts = source[ToArray](o => o.parent).reverse()
    var targetParts = target[ToArray](o => o.parent).reverse()

    // check prefix and separator
    if (!sourceParts[0].equals(targetParts[0], ignoreSeparator))
      throw new NoRelativePathExistsException(source, target)

    for (var i = 1; i < sourceParts.length && i < targetParts.length; i++) {

      // find common ancestor
      if (sourceParts[i].name != targetParts[i].name)
        break
    }

    // fail if source has more `..` than target; can't get to `..\bar` from `..\..\foo` 
    if (i < sourceParts.length && sourceParts[i].isDotDot)
      throw new NoRelativePathExistsException(source, target)

    var result = PathBuilder.createRelative(this.sepBuffer)

    // back out of source to common ancestor
    for (var j = i; j < sourceParts.length; j++)
      result = result.dir

    // advance from common ancestor to target
    for (var j = i; j < targetParts.length; j++)
      result = result.to(targetParts[j].name)

    return result
  }

  to(path) {
    if (!path)
      return this;

    if (is.string(path)) {
      assert(path.indexOf(this.sepBuffer.toString()) == -1)
      assert(path != Dot)
      assert(path != DotDot)
      return this._to(path)
    } 

    assert(path instanceof PathBuilder)

    if (path.isAbsolute)
      return path
    
    if (path.isDot)
      return this

    var result = this

    if (path.parent)
      result = result.to(path.parent)

    if (path.isDotDot)
      return result.dir

    return result._to(path.name)
  }

  toString() {
    return this.buffer.toString()
  }
}

class RootPathBuffer extends PathBuilder {
  constructor(sepBuffer, prefixBuffer) {
    assert(sepBuffer instanceof Buffer)
    assert(!prefixBuffer || prefixBuffer instanceof Buffer)

    super()
    
    this.sepBuffer = sepBuffer

    if (prefixBuffer) {
      this.prefixBuffer = prefixBuffer
      this.hasPrefixBuffer = true
    }
  }

  get buffer() {
    if (!this._buffer)
      this._buffer = EmptyBuffer[Append](this.prefixBuffer, this.sepBuffer)
    return this._buffer
  }

  get isRoot() {
    return true
  }

  get isAbsolute() {
    return true
  }

  equals(other, ignoreSeparator) {
    if ((other instanceof RootPathBuffer) == false)
      return false

    if (!ignoreSeparator && !this.sepBuffer.equals(other.sepBuffer))
      return false

    if (this.hasPrefixBuffer != other.hasPrefixBuffer)
      return false

    if (this.hasPrefixBuffer && !this.prefixBuffer.equals(other.prefixBuffer))
      return false

    return true
  }
}

class DotPathBuilder extends PathBuilder {
  constructor(sepBuffer) {
    super()
    
    this.sepBuffer = sepBuffer
    this.buffer = DotBuffer
  }

  get dir() {
    return new DotDotPathBuilder(this)
  }

  get isDot() {
    return true
  }

  get isRelative() {
    return true
  }

  equals(other, ignoreSeparator) {
    if ((other instanceof DotPathBuilder) == false)
      return false

    if (!ignoreSeparator && !this.sepBuffer.equals(other.sepBuffer))
      return false

    return true
  }
}

class DotDotPathBuilder extends PathBuilder {
  constructor(parent) {
    assert(parent instanceof DotPathBuilder || parent instanceof DotDotPathBuilder)

    super()
    
    this.parent = parent
    this.sepBuffer = parent.sepBuffer
  }

  get buffer() {
    if (!this._buffer) 
      this._buffer = this.parent instanceof DotPathBuilder ? DotDotBuffer :
        this.parent.buffer[Append](this.sepBuffer, DotDotBuffer)

    return this._buffer
  }
  
  get dir() {
    return new DotDotPathBuilder(this)
  }

  get isRelative() {
    return true
  }

  get isDotDot() {
    return true
  }

  equals(other, ignoreSeparator) {
    if ((other instanceof DotDotPathBuilder) == false)
      return false

    if (!this.parent.equals(other.parent, ignoreSeparator))
      return false

    return true
  }
}

class NamedPathBuilder extends PathBuilder {
  constructor(parent, name) {
    assert(parent)

    super()
    
    this.parent = parent
    this.name = name
  }

  get prefixBuffer() {
    return this.parent.prefixBuffer
  }

  get sepBuffer() {
    return this.parent.sepBuffer
  }

  get buffer() {
    if (!this._buffer) {
      var { parent, sepBuffer, name } = this

      if (parent instanceof RootPathBuffer)
        this._buffer = parent.buffer[Append](name)

      else if (parent instanceof DotPathBuilder)
        this._buffer = Buffer.from(name)

      else
        this._buffer = parent.buffer[Append](sepBuffer, name)
    }

    return this._buffer
  }

  get dir() {
    return this.parent
  }

  get isNamed() {
    return true
  }

  get isAbsolute() {
    return this.parent.isAbsolute
  }

  get isRelative() {
    return this.parent.isRelative
  }

  get ext() {
    return Path.extname(this.name)
  }

  get basename() {
    return Path.basename(this.name, this.ext)
  }

  equals(other, ignoreSeparator) {
    if ((other instanceof NamedPathBuilder) == false)
      return false

    if (!this.parent.equals(other.parent, ignoreSeparator))
      return false

    return this.name == other.name
  }
}

PathBuilder.NoRelativePathExistsException = NoRelativePathExistsException

module.exports = PathBuilder
