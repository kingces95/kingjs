var { assert,
  '@kingjs': {
    Path, EmptyObject, 
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-fs': { Exists, Stat, Move, Kind,
      '-dir': { Remove, Make, List, Write, SymlinkTo },
      '-leaf': { Copy, Unlink },
      '-file': { Read, Overwrite },
      '-symlink': { Follow },
    }
  },
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var Utf8 = 'utf8'

function activate(path, stat) {
  var { ino, mtimeMs } = stat

  if (stat.isFile()) return new FileLink(path, ino, mtimeMs)
  if (stat.isDirectory()) return new DirLink(path, ino, mtimeMs)

  assert.ok(stat.isSymbolicLink())
  return new SymbolicLink(path, ino, mtimeMs)
}

function create(path, options = EmptyObject) {
  var { async } = options

  var promise = path[Stat]({ async })

  var epilog = stats => activate(path, stats, { async })
  return async ? promise.then(epilog) : epilog(promise)
}

class Link {
  static get dot() { return create(Path.dot) }

  constructor(path, ino, mtime) {
    assert.ok(path)
    assert.ok(ino)
    assert.ok(mtime)

    this.path = path
    this.mtime = mtime
    this.ino = ino
  }
  get isInode() { return true }
  get name() { return this.path.name }

  stat(options = EmptyObject) {
    var { async } = options

    return this.path[Stat]({ async }) 
  }
  statAsync() {
    return this.stat(Async)
  }

  exists(options = EmptyObject) { 
    var { async } = options

    return this.path[Exists]({ async }) 
  }
  existsAsync() { 
    return this.exists(Async) 
  }

  refresh(options = EmptyObject) { 
    var { async } = options

    return create(this.path, { async }) 
  }
  refreshAsync() { 
    return this.refresh(Async) 
  }

  move(dir, options = EmptyObject) { 
    var { async, name } = options

    var promise = this.path[Move](dir.path, { name, async }) 

    var epilog = path => create(path, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  moveAsync(dir, options = EmptyObject) { 
    return this.move(dir, { ...options, ...Async }) 
  }

  toString() { 
    var path = this.path.toString()
    var { ino, mtime } = this
    return `${path}, ino=${ino}, mtime=${mtime}` 
  }
  get __toString() { return this.toString() }

  [Equals](other) { 
    var { path, ino, mtime } = this

    return other instanceof Link && 
      path[Equals](other.path) && 
      ino == other.ino &&
      mtime == other.mtime
  }
  [GetHashcode]() {
    var { path, ino, mtime } = this
    return path[GetHashcode]() ^ ino ^ mtime
  }
  [IsLessThan](other) {
    assert(other instanceof Link)
    var { path, ino, mtime } = this

    if (path[IsLessThan](other.path)) return true
    if (other.path[IsLessThan](path)) return false

    if (ino < other.ino) return true
    if (other.ino < ino) return false

    if (mtime < other.mtime) return true
    if (other.mtime < mtime) return false

    return false
  }
}

class DirLink extends Link {
  constructor(path, ino, mtime) { super(path, ino, mtime) }
  get kind() { return Kind.Directory }
  get isDirectory() { return true }

  make(name, options = EmptyObject) {
    var { async } = options 

    var promise = this.path[Make](name, { async })

    var epilog = o => create(o, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  makeAsync(name) {
    return this.make(name, Async)
  }

  list(options = EmptyObject) { 
    var { async } = options

    var promise = this.path[List]({ async })
    var epilog = o => o.map(x => create(x, async))
    return async ? promise.then(o => epilog(o)).then(o => Promise.all(o)) : epilog(promise)
  }
  listAsync() { 
    return this.list(Async)
  }

  remove(options = EmptyObject) { 
    var { async } = options 

    return this.path[Remove]({ async }) 
  }
  removeAsync() {
    return this.remove(Async) 
  }

  write(name, data, options = EmptyObject) { 
    var { async, encoding } = options 

    var promise = this.path[Write](name, data, { async, encoding }) 

    var epilog = path => create(path, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  writeAsync(name, data, options = EmptyObject) { 
    return this.write(name, data, { ...options, ...Async }) 
  }

  symlinkTo(name, dir, options = EmptyObject) { 
    assert.ok(dir instanceof DirLink)
    var { async, name: targetName } = options 
    var { path: targetDir } = dir

    var promise = this.path[SymlinkTo](name, targetDir, { async, name: targetName }) 

    var epilog = o => create(o, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  symlinkToAsync(name, data, options = EmptyObject) { 
    return this.symlinkTo(name, data, { ...options, ...Async }) 
  }
}

class LeafLink extends Link {
  constructor(path, ino, mtime) { super(path, ino, mtime) }

  copy(dir, options = EmptyObject) { 
    assert.ok(dir instanceof DirLink)
    var { name, async } = options

    var promise = this.path[Copy](dir.path, { name, async })

    var epilog = o => create(o, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  copyAsync(dir, options = EmptyObject) { 
    return this.copy(dir, { ...options, ...Async })
  }

  unlink(options = EmptyObject) {
    var { async } = options

    return this.path[Unlink]({ async }) 
  }
  unlinkAsync() {
    return this.unlink(Async) 
  }
}

class FileLink extends LeafLink {
  constructor(path, ino, mtime) { super(path, ino, mtime) }
  get kind() { return Kind.File }
  get isFile() { return true }

  read(options = EmptyObject) { 
    var { async, encoding = Utf8 } = options
    return this.path[Read]({ encoding, async }) 
  }
  readAsync(options = EmptyObject) { 
    return this.read({ ...options, ...Async }) 
  }

  overwrite(data, options = EmptyObject) {
    var { encoding, async } = options

    var promise = this.path[Overwrite](data, { encoding, async })

    var epilog = () => create(this.path, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  overwriteAsync(data, options = EmptyObject) {
    return this.overwrite(data, { ...options, ...Async })
  }
}

class SymbolicLink extends LeafLink {
  constructor(path, ino, mtime) { super(path, ino, mtime) }
  get kind() { return Kind.SymbolicLink }
  get isSymbolicLink() { return true }

  follow(options = EmptyObject) { 
    var { async } = options

    var promise = this.path[Follow]({ async }) 

    var epilog = o => create(o, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  followAsync(options = EmptyObject) { 
    return this.follow({ ...options, ...Async }) 
  }
}

Link.Dir = DirLink
Link.Leaf = LeafLink
Link.File = FileLink
Link.SymbolicLink = SymbolicLink

module.exports = Link