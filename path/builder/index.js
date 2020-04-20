var { 
  assert,
  Path,
  ['@kingjs']: {
    pojo: { ToArray },
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

var DotPath
var SepPath
var DotDotPath

/**
 * @description An working set efficient representation of paths. 
 * 
 * @remarks - `PathBuilder.pwd`: A `PathBuilder` representing a relative path
 * @remarks - `PathBuilder.sep`: A `PathBuilder` representing an absolute path
 * @remarks - `PathBuilder.parse(path)`: Activate a new `PathBuilder`
 * @remarks - `PathBuilder` supports the following methods and properties
 * @remarks -- `buffer`: Returns a `Buffer` representation of the path
 * @remarks -- `sep(name)`: Returns a new `PathBuilder` with joined with `name`
 * @remarks -- `name` : Returns the last segment of the `PathBuilder`
 * @remarks -- `path` : The path as a string
 * @remarks -- `isSep` : `true` if path is `/`
 * @remarks -- 'isDot' : `true` if path is `.`
 * @remarks -- `isAbsolute` : `true` if the path is absolute
 * @remarks -- `isRelative` : `true` if the path is relative
 */
class PathBuilder {

  static get cwd() {
    return PathBuilder.parse(process.cwd())
  }

  static get dot() {
    if (!DotPath) 
      DotPath = new DotPathBuilder() 
    return DotPath
  }

  static get dotDot() {
    if (!DotDotPath) 
      DotDotPath = new DotDotPathBuilder() 
    return DotDotPath
  }

  static get sep() { 
    if (!SepPath) 
      SepPath = new SepPathBuilder() 
    return SepPath  
  }

  static async launch(symbol) {
    try {
      var args = process.argv.slice()
      var node = args.shift()
      var file = args.shift()
      var path = PathBuilder.parse(args.shift() || process.cwd())
      await path[symbol](...args)
    }
    catch(e) {
      console.log(e)
      process.exit(1)
    }
  }

  static parse(path) {
    if (path instanceof PathBuilder)
      return path

    if (path == EmptyString || path == Dot)
      return this.dot

    if (path == Sep)
      return this.sep

    var dir = Path.dirname(path)
    var result = this.parse(dir)

    var name = Path.basename(path)
    if (name == Dot)
      return result

    if (name == DotDot)
      return result.dir

    return result._to(name)
  }

  constructor(parent, buffer) {
    this.parent = parent
    this.buffer = buffer
  }

  get __toString() { 
    return this.toString() 
  }

  _to(name) {
    return new NamedPathBuilder(
      this, this.buffer[Append](SepBuffer, name), name)
  }

  toRelative(target) {
    var source = this
    target = PathBuilder.parse(target)

    // if one path is absolute, make the other absolute
    if (source.isRelative != target.isRelative) {
      if (source.isRelative)
        source = PathBuilder.cwd.to(source)
      else
        target = PathBuilder.cwd.to(target)
    }

    // keep it simple...
    var sourceParts = source[ToArray](o => o.parent).reverse()
    var targetParts = target[ToArray](o => o.parent).reverse()

    var result = PathBuilder.dot
    for (var i = 0; i < sourceParts.length && i < targetParts.length; i++) {

      // find common ancestor
      if (sourceParts[i].name != targetParts[i].name)
        break
    }

    // fail if source has more `..` than target
    if (i < sourceParts.length && sourceParts[i].isDotDot)
      return undefined

    // back out of source to common ancestor
    for (var j = i; j < sourceParts.length; j++)
      result = result.dir

    // advance from common ancestor to target
    for (var j = i; j < targetParts.length; j++)
      result = result.to(targetParts[j].name)

    return result
  }

  to(path) {

    if (is.string(path)) {

      if (path == EmptyString || path == Dot)
        return this

      if (path == DotDot)
        return this.dir

      if (path.indexOf(Sep) == -1)
        return this._to(path)

      return this.to(PathBuilder.parse(path))
    }
  
    if (!path)
      return this;

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

  equals(other) {
    if (this == other)
      return true

    if (!other)
      return false

    if ((other instanceof PathBuilder) == false)
      return false

    if (!!this.parent != !!other.parent)
      return false

    if (this.parent && !this.parent.equals(other.parent))
      return false

    if (this.isDot != other.isDot)
      return false

    if (this.isDotDot != other.isDotDot)
      return false

    if (this.isSep != other.isSep)
      return false

    return this.name == other.name
  }

  toString() {
    return this.buffer.toString()
  }
}

class NamedPathBuilder extends PathBuilder {
  constructor(parent, buffer, name) {
    super(parent, buffer)

    this.name = name
  }

  _to(name) {
    return super._to(name)
  }

  get dir() {
    return this.parent;
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
}

class DotDotPathBuilder extends PathBuilder {
  constructor(parent) {
    assert(!parent || parent instanceof DotDotPathBuilder)
    super(parent, parent ? 
      parent.buffer[Append](SepBuffer, DotDotBuffer) : DotDotBuffer)
  }

  _to(name) {
    return super._to(name)
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
}

class SepPathBuilder extends PathBuilder {
  constructor() {
    super(null, SepBuffer)
  }

  _to(name) {
    return new NamedPathBuilder(this, this.buffer[Append](name), name)
  }

  get dir() {
    return undefined
  }

  get isSep() {
    return true
  }

  get isAbsolute() {
    return true
  }
}

class DotPathBuilder extends PathBuilder {
  constructor() {
    super(null, DotBuffer)
  }

  _to(name) {
    return new NamedPathBuilder(this, Buffer.from(name), name)
  }

  get dir() {
    return PathBuilder.dotDot;
  }

  get isDot() {
    return true
  }

  get isRelative() {
    return true
  }
}

module.exports = PathBuilder