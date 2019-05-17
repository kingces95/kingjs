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
var DotBuffer = Buffer.from(Dot)
var SepBuffer = Buffer.from(Sep)

/**
 * @description An working set efficient representation of paths. 
 * 
 * @remarks - `PathBuffer.create([path])`: Activate a new `PathBuffer`
 * @remarks -- Uses `path.normalize` to normalize the path
 * @remarks - `PathBuffer` supports the following methods and properties
 * @remarks -- `joinWith(name)`: Takes a string and returns a `PathBuffer`
 * @remarks -- `buffer`: The path as a buffer
 * @remarks -- `bufferAsDir`: The path as a directory (with trailing sep) as a buffer
 * @remarks -- `name` : The name of the file or directory
 * @remarks -- `path` : The path as a string
 * @remarks -- `pathAsDir` : The path as a directory (with trailing sep) as a string
 * @remarks -- `dir` : The directory of the `PathBuffer` as a string
 * @remarks -- `parent` : The parent `PathBuffer`
 * @remarks -- `root` : The ultimate ancestor
 * @remarks -- `isRoot` : `true` if there is no `parent`
 * @remarks -- `isAbsolute` : `true` if the `root` `bufferAsDir` is a separator
 */
class PathBuffer {

  static create(path = EmptyString) {
    path = Path.normalize(path)
    var { base: name, dir } = Path.parse(path)

    // bug on windows
    if (name == EmptyString)
      name = Dot

    if (name == Dot || (!name && dir == Sep))
      return new PathBuffer(dir === Sep)

    return this.create(dir).joinWith(name)
  }

  constructor(nameOrIsAbsolute, parent) {
    this.parent = parent

    if (!parent) {
      assert(is.boolean(nameOrIsAbsolute))
      var isAbsolute = nameOrIsAbsolute

      this.isRoot = true
      this.root = this
      this.isAbsolute = isAbsolute

      if (isAbsolute) {
        this.name = EmptyString
        this.buffer = SepBuffer
        this.bufferAsDir = SepBuffer
      }
      else {
        this.name = Dot
        this.buffer = DotBuffer
        this.bufferAsDir = EmptyBuffer
      }
    }
    else {
      assert(is.string(nameOrIsAbsolute))
      var name = nameOrIsAbsolute

      this.isRoot = false
      this.root = this.parent.root
      this.isAbsolute = this.parent.isAbsolute
     
      this.name = name
      this.buffer = parent.bufferAsDir[Append](Buffer.from(name))
      this.bufferAsDir = this.buffer[Append](SepBuffer)
    }
  }

  joinWith(name) {
    return new PathBuffer(name, this)
  }

  get path() {
    return this.buffer.toString()
  }

  get pathAsDir() {
    return this.bufferAsDir.toString()
  }

  get dir() {
    if (this.isRoot)
      return undefined;
    return this.parent.bufferAsDir.toString()
  }

  toString() {
    return this.path
  }
}

module.exports = PathBuffer