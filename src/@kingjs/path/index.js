var { assert, Path: NodePath,
  '@kingjs': { 
    PathBuilder, 
    WeakMapByInternedString,
    '-reflect': { isString },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyString = ''
var Dot = '.'
var DotDot = '..'

var current
var windows
var posix

/**
 * @description An working set efficient representation of paths. 
 * 
 * @remarks - Static members
 * @remarks -- `cwd`: the current working directory
 * @remarks -- `dot`: the `.` path
 * @remarks -- `root`: the root path
 * @remarks -- `create(prefix)`: create a root path with a prefix. e.g. `c:`
 * @remarks -- `parse(path)`: create a `PathBuilder` from a string path
 * @remarks -- `launch(symbols)`: call extension method `symbol` on `this` 
 *                with command line arguments
 * @remarks -- `posix`: a Path for creating posix paths
 * @remarks -- `windows`: a Path for creating windows paths 
 */
class Path {

  static get Builder() {
    return PathBuilder
  }

  static get posix() {
    if (!posix)
      posix = new Path(NodePath.posix)
    return posix
  }

  static get windows() {
    if (!windows)
      windows = new Path(NodePath.win32)
    return windows
  }

  static get current() {
    if (!current)
      current = new Path(NodePath)
    return current
  }

  static cwd() {
    return Path.current.cwd()
  }

  static get dot() { 
    return Path.current.dot
  }

  static get root() { 
    return Path.current.root
  }

  static create(prefix) {
    return Path.current.create(prefix)
  }

  static parse(path) {
    return Path.current.parse(path)
  }

  static async launch(symbol) {
    var cwd = Path.parse(process.cwd())

    var args = process.argv.slice()
    var node = args.shift()
    var file = args.shift()
    var path = cwd.to(Path.parse(args.shift() || '.'))
    var relPath = cwd.toRelative(path)
    return await relPath[symbol](...args)
  }

  constructor(platform) {
    assert(
      platform == NodePath || 
      platform == NodePath.posix || 
      platform == NodePath.win32
    )

    this.platform = platform
    this.sep = platform.sep
    this.sepBuffer = Buffer.from(this.sep)
    this.dot = PathBuilder.createRelative(this.sep)
    this.root = PathBuilder.createRoot(this.sep) 
  }

  create(prefix) {
    var buffer = Buffer.from(prefix)

    if (!this.map_)
      this.map_ = new WeakMapByInternedString()

    var result = this.map_.get(prefix)
    if (!result)
      result = this.map_.set(prefix, PathBuilder.createRoot(this.sepBuffer, buffer))
    return result
  }

  cwd() {
    return this.parse(process.cwd()) 
  }

  parse(path, base) {
    assert.ok(isString(path))

    if (path == this.sep)
      return this.root

    if (!base)
      base = this.dot

    if (path == EmptyString || path == Dot)
      return base

    if (path == DotDot)
      return base.dir

    if (path.indexOf(this.sep) == -1)
      return base.to(path)

    base = this.parse(this.platform.dirname(path))
    return this.parse(this.platform.basename(path), base)
  }
}

module.exports = Path