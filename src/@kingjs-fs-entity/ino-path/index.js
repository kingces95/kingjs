var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-fs': {
      '-entity': { DirEntry },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var EmptyObject = { }

class InoPath {
  static get dot() { return InoPath.create(DirEntry.dot) }

  static create(dirEntry) {
    var stat = dirEntry.stat()

    if (dirEntry.isFile) return new File(dirEntry, stat)
    if (dirEntry.isDirectory) return new Dir(dirEntry, stat)

    assert.ok(dirEntry.isSymbolicLink)
    if (dirEntry.isSymbolicLink) return new SymbolicLink(dirEntry, stat)
  }

  constructor(dirEntry, stat) {
    assert.ok(dirEntry)
    assert.ok(stat)

    // TODO: Remove
    Reflect.defineProperty(this, '_stat', { value: stat })
    this.dirEntry = dirEntry
  }
  get isInoPath() { return true }

  get path() { return this.dirEntry.path }
  get kind() { return this.dirEntry.kind }
  get name() { return this.dirEntry.name }
  get ino() { return this._stat.ino }

  exists(options) { return this.dirEntry.exists(options) }
  existsAsync() { return this.exists(Async) }

  stat(options) { return this.dirEntry.stat(options) }
  statAsync(options) { return this.stat({ ...Async, ...options }) }

  move(dir, options = EmptyObject) { 
    var result = this.dirEntry.move(dir, options)
    var epilog = o => InoPath.create(o)
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  moveAsync(dir, options = EmptyObject) { 
    return this.move(dir, { ...Async, ...options })
  }

  toString() { return `${this.dirEntry.toString()}, ino=${this.ino}` }
  get __toString() { return this.toString() }

  [Equals](o) {
    return o instanceof InoPath && this.dirEntry[Equals](o.dirEntry) && this.ino == o.ino
  }
  [GetHashcode]() { 
    return this.dirEntry[GetHashcode]() ^ this.ino
  }
  [IsLessThan](other) {
    assert(other instanceof InoPath)
    if (this.dirEntry[IsLessThan](other.dirEntry))
      return true
  
    if (other.dirEntry[IsLessThan](this.dirEntry))
      return false
    
    return this.ino < other.ino
  }
}

class Dir extends InoPath {
  static get dot() { return new Dir(DirEntry.dot) }

  constructor(dirEntry, ino) { super(dirEntry, ino) }
  get isDirectory() { return true }

  make(name, options) { 
    var result = this.dirEntry.make(name, options)
    var epilog = o => InoPath.create(o)
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  makeAsync(name) { 
    return this.make(name, Async)
  }

  list(options) { 
    var result = this.dirEntry.list(options)
    var epilog = o => o.map(x => InoPath.create(x))
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  listAsync() { 
    return this.list(Async) 
  }

  remove(options) { 
    return this.dirEntry.remove(options)
  }
  removeAsync() { 
    return this.remove(Async) 
  }

  write(name, data, options) { 
    var result = this.dirEntry.write(name, data, options)
    var epilog = o => InoPath.create(o)
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  async writeAsync(name, data, options = EmptyObject) { 
    return this.write(name, data, { ...Async, ...options })
  }
}

class FileOrSymbolicLink extends InoPath {
  constructor(dirEntry, ino) { super(dirEntry, ino) }

  copy(dir, options) { 
    var result = this.dirEntry.copy(dir.dirEntry, options)
    var epilog = o => InoPath.create(o)
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  async copyAsync(dir, options = EmptyObject) { 
    return this.copy(dir, { ...Async, ...options })
  }

  read(options = EmptyObject) {
    var { link } = options 
    var result = this.dirEntry.read(options) 
    var epilog = o => link ? InoPath.create(o) : o
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  readAsync(options = EmptyObject) { 
    return this.read({ ...Async, ...options }) 
  }

  unlink(options) { 
    return this.dirEntry.unlink(options) 
  }
  unlinkAsync() { 
    return this.unlink(Async) 
  }
}

class File extends FileOrSymbolicLink {
  constructor(dirEntry, ino) { super(dirEntry, ino) }
  get isFile() { return true }
}

class SymbolicLink extends FileOrSymbolicLink {
  constructor(dirEntry, ino) { super(dirEntry, ino) }
  get isSymbolicLink() { return true }
}

InoPath.File = File
InoPath.Dir = Dir
InoPath.SymbolicLink = SymbolicLink

module.exports = InoPath