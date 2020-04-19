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

var Relative
var Root
var Parent

/**
 * @description An working set efficient representation of paths. 
 * 
 * @remarks - `PathBuilder.Pwd`: A `PathBuilder` representing a relative path
 * @remarks - `PathBuilder.Root`: A `PathBuilder` representing an absolute path
 * @remarks - `PathBuilder.parse(path)`: Activate a new `PathBuilder`
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

  static get sep() {
    return Path.sep
  }

  static get Cwd() {
    return PathBuilder.parse(process.cwd())
  }

  static get Relative() {
    if (!Relative) 
      Relative = new CwdPathBuilder() 
    return Relative
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
      return this.Relative

    if (path == Sep)
      return this.Root

    var dir = Path.dirname(path)
    var result = this.parse(dir)

    var name = Path.basename(path)
    if (name == Dot)
      return result

    if (name == DotDot)
      return result.dir

    return result._to(name)
  }

  constructor(parent, name, buffer) {
    this.parent = parent
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

  toRelative(target) {
    var source = this
    target = PathBuilder.parse(target)

    // if one path is absolute, make the other absolute
    if (source.isRelative != target.isRelative) {
      if (source.isRelative)
        source = PathBuilder.Cwd.to(source)
      else
        target = PathBuilder.Cwd.to(target)
    }

    // keep it simple...
    var sourceParts = source[ToArray](o => o.parent).reverse()
    var targetParts = target[ToArray](o => o.parent).reverse()

    var result = PathBuilder.Relative
    for (var i = 0; i < sourceParts.length && i < targetParts.length; i++) {

      // find common ancestor
      if (sourceParts[i].name != targetParts[i].name)
        break
    }

    // fail if source has more `..` than target
    if (i < sourceParts.length && sourceParts[i].isRelativeParent)
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
    
    if (path.isCwd)
      return this

    var result = this
    if (path.parent)
      result = result.to(path.parent)

    if (path.isRelativeParent)
      return result.dir

    return result._to(path.name)
  }

  equals(other) {
    if (this == other)
      return true

    if (this.name != other.name)
      return false

    if (!this.parent || !other.parent)
      return false

    return this.parent.equals(other.parent)
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
    return this.parent;
  }

  get isSegment() {
    return true
  }

  get isAbsolute() {
    return this.parent.isAbsolute
  }

  get isRelative() {
    return this.parent.isRelative
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
    return undefined
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