var { assert,
  '@kingjs': {
    Path, EmptyObject, 
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-string': { GetHashcode: GetStringHashcode },
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
  if (stat.isFile()) return new FileInode(path, stat)
  if (stat.isDirectory()) return new DirInode(path, stat)

  assert.ok(stat.isSymbolicLink())
  return new SymbolicLinkInode(path, stat)
}

class Inode {
  static get dot() { return Inode.create(Path.dot) }

  static create(path, options = EmptyObject) {
    var { async } = options

    var promise = path[Stat]({ async })

    var epilog = stats => activate(path, stats, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  static async createAsync(path) {
    return Inode.create(path, Async) 
  }

  constructor(path, stat) {
    assert.ok(path)
    assert.ok(stat)

    Reflect.defineProperty(this, 'stat', { value: stat })
    Reflect.defineProperty(this, 'path', { value: path })
  }
  get isInode() { return true }
  get ino() { return this.stat.ino }
  get mtime() { return this.stat.mtimeMs }
  get name() { return this.path.name }

  refresh(options = EmptyObject) {
    var { async } = options

    return Inode.create(this.path, { async })
  }
  refreshAsync() {
    return this.refresh(Async)
  }

  exists(options = EmptyObject) { 
    var { async } = options

    return this.path[Exists]({ async }) 
  }
  existsAsync() { 
    return this.exists(Async) 
  }

  move(dir, options = EmptyObject) { 
    var { async, name } = options

    var promise = this.path[Move](dir.path, { name, async }) 

    var epilog = path => Inode.create(path, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  moveAsync(dir, options = EmptyObject) { 
    return this.move(dir, { ...options, ...Async }) 
  }

  toString() { return this.path.toString() }
  get __toString() { return this.toString() }

  [Equals](o) { 
    return o instanceof Inode && o.name == this.name && o.kind == this.kind 
  }
  [GetHashcode]() { 
    return this.name[GetStringHashcode]() ^ this.kind[GetHashcode]() 
  }
  [IsLessThan](other) {
    assert(other instanceof Inode)
    if (this.path[IsLessThan](other.path))
      return true

    if (other.path[IsLessThan](this.path))
      return false

    return this.kind < other.kind
  }
}

class DirInode extends Inode {
  constructor(path, stat) { super(path, stat) }
  get kind() { return Kind.Directory }
  get isDirectory() { return true }

  make(name, options = EmptyObject) {
    var { async } = options 

    var promise = this.path[Make](name, { async })

    var epilog = o => Inode.create(o, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  makeAsync(name) {
    return this.make(name, Async)
  }

  list(options = EmptyObject) { 
    var { async } = options

    var promise = this.path[List]({ async })
    var epilog = o => o.map(x => Inode.create(x, async))
    return async ? 
      promise.then(o => epilog(o)).then(o => Promise.all(o)) : 
      epilog(promise)
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

    var epilog = path => Inode.create(path, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  writeAsync(name, data, options = EmptyObject) { 
    return this.write(name, data, { ...options, ...Async }) 
  }

  symlinkTo(name, dir, options = EmptyObject) { 
    assert.ok(dir instanceof DirInode)
    var { async, name: targetName } = options 
    var { path: targetDir } = dir

    var promise = this.path[SymlinkTo](name, targetDir, { async, name: targetName }) 

    var epilog = o => Inode.create(o, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  symlinkToAsync(name, data, options = EmptyObject) { 
    return this.symlinkTo(name, data, { ...options, ...Async }) 
  }
}

class LeafInode extends Inode {
  constructor(path, stat) { super(path, stat) }

  copy(dir, options = EmptyObject) { 
    assert.ok(dir instanceof DirInode)
    var { name, async } = options

    var promise = this.path[Copy](dir.path, { name, async })

    var epilog = o => Inode.create(o, { async })
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

class FileInode extends LeafInode {
  constructor(path, stat) { super(path, stat) }
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

    var epilog = () => this.refresh({ async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  overwriteAsync(data, options = EmptyObject) {
    return this.overwrite(data, { ...options, ...Async })
  }
}

class SymbolicLinkInode extends LeafInode {
  constructor(path, stat) { super(path, stat) }
  get kind() { return Kind.SymbolicLink }
  get isSymbolicLink() { return true }

  follow(options = EmptyObject) { 
    var { async } = options

    var promise = this.path[Follow]({ async }) 

    var epilog = o => Inode.create(o, { async })
    return async ? promise.then(epilog) : epilog(promise)
  }
  followAsync(options = EmptyObject) { 
    return this.follow({ ...options, ...Async }) 
  }
}

Inode.File = FileInode
Inode.Dir = DirInode
Inode.SymbolicLink = SymbolicLinkInode

module.exports = Inode