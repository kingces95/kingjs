var { assert, Path,
  '@kingjs': { Exception,
    'ISingleton': { IsSingleton },
    'IEquatable': { Equals, GetHashcode },
    'IComparable': { IsLessThan },
    '-pojo': { ToArray },
    '-reflect': { isString },
    '-string': { StringBuilder },
  },
} = module[require('@kingjs-module/dependencies')]()

var NoRelativePathExists = "No relative path exists from '${from}' to '${to}'."

var Dot = '.'
var DotDot = '..'
var EmptyString = ''

var EmptyBuffer = StringBuilder.empty
var DotBuffer = EmptyBuffer.append(Dot)
var DotDotBuffer = EmptyBuffer.append(DotDot)

var NonEnumerable = { writable: true }

class NoRelativePathExistsException extends Exception {
  constructor(from, to) {
    from = from.toString()
    to = to.toString()

    super(NoRelativePathExists, { from, to })
  }
}

var weakMap = new WeakMap()

function getOrAdd(target, key, create) {
  assert.ok(target instanceof PathBuilder || target == DotPathBuilder || target == RootPathBuilder)
  assert.ok(isString(key))

  var map = weakMap.get(target)
  if (!map) {
    map = new Map()
    weakMap.set(target, map)
  }

  var result = map.get(key)
  if (!result) {
    result = create(key)
    map.set(key, result)
  }

  return result
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
  static createRelative(sep) {
    assert.ok(isString(sep))

    return getOrAdd(DotPathBuilder, sep, o => new DotPathBuilder(o))
  }

  static createRoot(sep, prefix) {
    assert.ok(isString(sep))
    assert.ok(!prefix || isString(prefix))

    return getOrAdd(RootPathBuilder, (prefix || EmptyString) + sep, 
      () => new RootPathBuilder(sep, prefix)
    )
  }

  constructor(buffer, sepBuffer) { 
    assert.ok(buffer instanceof StringBuilder)
    assert.ok(sepBuffer instanceof StringBuilder)

    this._builder = buffer
    this._sepBuffer = sepBuffer

    Object.defineProperties(this, { 
      _hashcode: NonEnumerable,
      _builder: NonEnumerable,
      _sepBuffer: NonEnumerable,
      _map: NonEnumerable,
    })
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

    var result = PathBuilder.createRelative(this.sep)

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

    if (isString(path)) {
      assert(path.indexOf(this._sepBuffer.toString()) == -1)
      assert(path != Dot)
      assert(path != DotDot)
      return NamedPathBuilder.create(this, path)
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

    return NamedPathBuilder.create(result, path.name)
  }

  get sep() { return this._sepBuffer.toString() }
  get builder() { return this._builder }
  get buffer() { return this.builder.buffer }
  toString() { return this._builder.toString() }
  get __toString() { return this.toString() }

  [IsSingleton]() { return true }

  [Equals](other) { return this == other }
  [GetHashcode]() { return this._builder[GetHashcode]()}

  [IsLessThan](other) { 
    assert.ok(other instanceof PathBuilder)
    return this._builder[IsLessThan](other._builder)
  }
}

class RootPathBuilder extends PathBuilder {
  constructor(sep, prefix) {
    assert.ok(isString(sep))
    assert.ok(!prefix || isString(prefix))

    super(new StringBuilder((prefix || EmptyString) + sep), new StringBuilder(sep))

    if (prefix) {
      assert.ok(isString(prefix))
      this._prefixBuilder = new StringBuilder(prefix)
    }
  }

  get root() { return this }
  get prefix() { return this._prefixBuilder ? this._prefixBuilder.toString() : undefined }
  get isRoot() { return true }
  get isAbsolute() { return true }
}

class NamedPathBuilder extends PathBuilder {

  static create(parent, name) {
    assert.ok(parent instanceof PathBuilder)
    assert.ok(isString(name))
    
    return getOrAdd(parent, name, o => new NamedPathBuilder(parent, o))
  }

  constructor(parent, name) {
    assert.ok(parent instanceof PathBuilder)
    assert.ok(isString(name))

    var sepBuffer = parent._sepBuffer

    if (parent instanceof RootPathBuilder)
      super(parent._builder.append(name), sepBuffer)

    else if (parent instanceof DotPathBuilder)
      super(new StringBuilder(name), sepBuffer)

    else
      super(parent._builder.append(parent._sepBuffer, name), sepBuffer)
    
    this.name = name
    this.parent = parent
  }

  get prefix() { return this.parent.prefix }

  get isNamed() { return true }
  get isAbsolute() { return this.parent.isAbsolute }
  get isRelative() { return this.parent.isRelative }

  get dir() { return this.parent }
  get root() { return this.parent.root }
  get ext() { return Path.extname(this.name) }
  get basename() { return Path.basename(this.name, this.ext) }
}

class RelativePathBuilder extends PathBuilder {
  get dir() {
    var dir = this._dir
    if (!dir)
      this._dir = dir = new DotDotPathBuilder(this)
    return dir
  }
}

class DotPathBuilder extends RelativePathBuilder {
  constructor(sep) {
    super(DotBuffer, new StringBuilder(sep))
  }

  get isDot() { return true }
  get isRelative() { return true }
}

class DotDotPathBuilder extends RelativePathBuilder {
  constructor(parent) {
    assert(parent instanceof DotPathBuilder || parent instanceof DotDotPathBuilder)

    var sepBuffer = parent._sepBuffer

    if (parent instanceof DotPathBuilder)
      super(DotDotBuffer, sepBuffer)

    else
      super(parent._builder.append(parent._sepBuffer, DotDotBuffer), sepBuffer)

    this.parent = parent
  }

  get isRelative() { return true }
  get isDotDot() { return true }
}

PathBuilder.NoRelativePathExistsException = NoRelativePathExistsException

module.exports = PathBuilder