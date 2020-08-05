var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-fs': {
      '-entity': { InoPath },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var EmptyObject = { }

class InoVersionLink {
  static get dot() { return InoVersionLink.create(InoPath.dot) }

  static create(inoLink) {
    if (inoLink.isFile) return new File(inoLink)
    if (inoLink.isDirectory) return new Dir(inoLink)

    assert.ok(inoLink.isSymbolicLink)
    if (inoLink.isSymbolicLink) return new SymbolicLink(inoLink)
  }

  constructor(inoLink) {
    assert.ok(inoLink)
    this.inoLink = inoLink
  }
  get isInoVersionPath() { return true }

  get path() { return this.inoLink.path }
  get kind() { return this.inoLink.kind }
  get name() { return this.inoLink.name }
  get ino() { return this.inoLink.ino }
  get mtime() { return this.inoLink._stat.mtimeMs }

  exists(options) { return this.inoLink.exists(options) }
  existsAsync() { return this.exists(Async) }

  stat(options) { return this.inoLink.stat(options) }
  statAsync(options) { return this.stat({ ...Async, ...options }) }

  move(dir, options = EmptyObject) { 
    var result = this.inoLink.move(dir, options)
    var epilog = o => InoVersionLink.create(o)
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  moveAsync(dir, options = EmptyObject) { 
    return this.move(dir, { ...Async, ...options })
  }

  toString() { return `${this.inoLink.toString()}, mtime=${this.mtime}` }
  get __toString() { return this.toString() }

  [Equals](o) {
    return o instanceof InoVersionLink && this.inoLink[Equals](o.inoLink) && this.mtime == o.mtime
  }
  [GetHashcode]() { 
    return this.inoLink[GetHashcode]() ^ this.mtime
  }
  [IsLessThan](other) {
    assert(other instanceof InoVersionLink)
    if (this.inoLink[IsLessThan](other.inoLink))
      return true
  
    if (other.inoLink[IsLessThan](this.inoLink))
      return false
    
    return this.mtime < other.mtime
  }
}

class Dir extends InoVersionLink {
  static get dot() { return new Dir(InoPath.dot) }

  constructor(inoLink, mtime) { super(inoLink, mtime) }
  get isDirectory() { return true }

  make(name, options) { 
    var result = this.inoLink.make(name, options)
    var epilog = o => InoVersionLink.create(o)
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  makeAsync(name) { 
    return this.make(name, Async)
  }

  list(options) { 
    var result = this.inoLink.list(options)
    var epilog = o => o.map(x => InoVersionLink.create(x))
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  listAsync() { 
    return this.list(Async) 
  }

  remove(options) { 
    return this.inoLink.remove(options)
  }
  removeAsync() { 
    return this.remove(Async) 
  }

  write(name, data, options) { 
    var result = this.inoLink.write(name, data, options)
    var epilog = o => InoVersionLink.create(o)
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  async writeAsync(name, data, options = EmptyObject) { 
    return this.write(name, data, { ...Async, ...options })
  }
}

class FileOrSymbolicLink extends InoVersionLink {
  constructor(inoLink, mtime) { super(inoLink, mtime) }

  copy(dir, options) { 
    var result = this.inoLink.copy(dir.inoLink, options)
    var epilog = o => InoVersionLink.create(o)
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  async copyAsync(dir, options = EmptyObject) { 
    return this.copy(dir, { ...Async, ...options })
  }

  read(options = EmptyObject) {
    var { link } = options 
    var result = this.inoLink.read(options) 
    var epilog = o => link ? InoVersionLink.create(o) : o
    return result instanceof Promise ? result.then(epilog) : epilog(result)
  }
  readAsync(options = EmptyObject) { 
    return this.read({ ...Async, ...options }) 
  }

  unlink(options) { 
    return this.inoLink.unlink(options) 
  }
  unlinkAsync() { 
    return this.unlink(Async) 
  }
}

class File extends FileOrSymbolicLink {
  constructor(inoLink, mtime) { super(inoLink, mtime) }
  get isFile() { return true }
}

class SymbolicLink extends FileOrSymbolicLink {
  constructor(inoLink, mtime) { super(inoLink, mtime) }
  get isSymbolicLink() { return true }
}

InoVersionLink.File = File
InoVersionLink.Dir = Dir
InoVersionLink.SymbolicLink = SymbolicLink

module.exports = InoVersionLink