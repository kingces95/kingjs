var { assert, Path,
  '@kingjs': { Exception, WeakMapByInternedString, Singleton,
    'IEquatable': { Equals, GetHashcode },
    'IComparable': { IsLessThan },
    '-string': { GetHashcode: GetStringHashcode },
    '-pojo': { ToArray },
    '-reflect': { is, isNumber },
    '-buffer': { Append }
  },
} = module[require('@kingjs-module/dependencies')]()

var NoRelativePathExists = "No relative path exists from '${from}' to '${to}'."

var EmptyString = ''
var Dot = '.'
var DotDot = '..'

var EmptyBuffer = Buffer.from(EmptyString)
var DotBuffer = Buffer.from(Dot)
var DotDotBuffer = Buffer.from(DotDot)

var NonEnumerable = { writable: true }

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
class PathBuilder extends Singleton {

  static createRelative(sepBuffer) {
    return DotPathBuilder.create(sepBuffer)
  }

  static createRoot(sepBuffer, prefixBuffer) {
    return RootPathBuffer.create(sepBuffer, prefixBuffer)
  }

  constructor() { 
    super()

    Object.defineProperties(this, { 
      _buffer: NonEnumerable,
      _map: NonEnumerable,
    })
  }

  get __toString() {
    return this.toString()
  }

  _to(name) {
    var map = this._map
    if (!map)
      this._map = map = new WeakMapByInternedString()

    var result = map.get(name)
    if (!result)
      result = map.set(name, new NamedPathBuilder(this, name))
    return result
  }

  get root() {
    return null
  }

  toRelative(target) {
    assert(target instanceof PathBuilder)
    assert(this.isRelative == target.isRelative)

    var source = this

    // keep it simple...
    var sourceParts = source[ToArray](o => o.parent).reverse()
    var targetParts = target[ToArray](o => o.parent).reverse()

    // check prefix
    if (!sourceParts[0][Equals](targetParts[0]))
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

  [Equals](other) {
    return this == other
  }

  [GetHashcode]() {
    var hashcode = this._hashcode
    if (!hashcode) {
      this._hashcode = hashcode = Array.prototype.reduce.call(
        this.buffer, 
        (a, o, i) => a ^ o << (i % 32), 
        0
      )
    
    }return hashcode
  }

  [IsLessThan](other) { 
    assert.ok(other instanceof PathBuilder)
    return this.buffer.compare(other.buffer) == -1
  }
}

class RootPathBuffer extends PathBuilder {

  static create(sepBuffer, prefixBuffer) {
    var map = RootPathBuffer._map
    if (!map)
      RootPathBuffer._map = map = new WeakMapByInternedString()

    var buffer = (prefixBuffer || EmptyBuffer)[Append](sepBuffer)
    var key = buffer.toString()
    var result = map.get(key)
    if (!result)
      result = map.set(key, new RootPathBuffer(sepBuffer, prefixBuffer, key, buffer))
    return result
  }

  constructor(sepBuffer, prefixBuffer, toString, buffer) {
    assert(sepBuffer instanceof Buffer)
    assert(!prefixBuffer || prefixBuffer instanceof Buffer)

    super()
    
    this.sepBuffer = sepBuffer
    this.buffer = buffer
    this._toString = toString

    if (prefixBuffer) {
      this.prefixBuffer = prefixBuffer
      this.hasPrefixBuffer = true
    }
  }

  get root() {
    return this
  }

  get isRoot() {
    return true
  }

  get isAbsolute() {
    return true
  }

  toString() {
    return this._toString
  }
}

class NamedPathBuilder extends PathBuilder {

  constructor(parent, name) {
    assert(parent)
    super()
    
    this.name = name
    this.parent = parent
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

  get root() {
    return this.parent.root
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
}

class RelativePathBuilder extends PathBuilder {

  constructor() {
    super()
  }

  get dir() {
    var result = this._dir
    if (!result)
      this._dir = result = new DotDotPathBuilder(this)
    return result
  }
}

class DotPathBuilder extends RelativePathBuilder {

  static create(sepBuffer) {
    var map = DotPathBuilder._map
    if (!map)
      DotPathBuilder._map = map = new WeakMapByInternedString()
    
    var key = sepBuffer.toString()
    var result = map.get(key)
    if (!result)
      result = map.set(key, new DotPathBuilder(sepBuffer))
    return result
  }
  
  constructor(sepBuffer) {
    super()
    
    this.sepBuffer = sepBuffer
    this.buffer = DotBuffer
  }

  get isDot() {
    return true
  }

  get isRelative() {
    return true
  }

  toString() {
    return Dot
  }
}

class DotDotPathBuilder extends RelativePathBuilder {
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

  get isRelative() {
    return true
  }

  get isDotDot() {
    return true
  }
}

PathBuilder.NoRelativePathExistsException = NoRelativePathExistsException

module.exports = PathBuilder