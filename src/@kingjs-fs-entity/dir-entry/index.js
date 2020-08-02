var { assert,
  '@kingjs': {
    Path, PathBuilder,
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-string': { GetHashcode: GetStringHashcode },
    '-fs': { Exists, Stat, Move,
      '-entity': { Kind },
      '-file': { Copy, Read, Unlink },
      '-dir': { Remove, Make, List, Write },
      '-promises': {
        Move: MoveAsync,
        Exists: ExistsAsync,
        Stat: StatAsync,
        '-file': {
          Copy: CopyAsync,
          Read: ReadAsync,
          Unlink: UnlinkAsync,
        },
        '-dir': {
          Remove: RemoveAsync,
          Make: MakeAsync,
          List: ListAsync,
          Write: WriteAsync,
        },
      },
    }
  },
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var EmptyObject = { }
var Utf8 = 'utf8'

class DirEntry {
  static get dot() { return new Dir(Path.dot) }

  static create(path, direntOrStat) {
    if (direntOrStat.isFile) return new File(path)
    if (direntOrStat.isDirectory) return new Dir(path)
  
    assert.ok(direntOrStat.isSymbolicLink)
    return new SymbolicLink(path)
  }

  constructor(path) {
    assert.ok(path)

    this.name = path.name
    this.path = path
  }
  get isDirEntry() { return true }

  exists() { return this.path[Exists]() }
  existsAsync() { return this.path[ExistsAsync]() }

  stat(options) { return this.path[Stat](options) }
  statAsync(options) { return this.path[StatAsync](options) }

  move(dir, options = EmptyObject) { 
    var { async, name } = options
    var promise = this.path[async ? MoveAsync : Move](dir.path, { name }) 
    var epilog = path => new this.constructor(path)
    return async ? promise.then(epilog) : epilog(promise)
  }
  moveAsync(dir, options) { 
    return this.move(dir, { ...options, ...Async }) 
  }

  toString() { return this.path.toString() }
  get __toString() { return this.toString() }

  [Equals](o) { 
    return o instanceof DirEntry && o.name == this.name && o.kind == this.kind 
  }
  [GetHashcode]() { 
    return this.name[GetStringHashcode]() ^ this.kind[GetHashcode]() 
  }
  [IsLessThan](other) {
    assert(other instanceof DirEntry)
    if (this.path[IsLessThan](other.path))
      return true

    if (other.path[IsLessThan](this.path))
      return false

    return this.kind < other.kind
  }
}

class Dir extends DirEntry {
  constructor(path) { super(path) }
  get kind() { return Kind.Directory }
  get isDirectory() { return true }

  make(name, options = EmptyObject) {
    var { async } = options 
    var path = this.path.to(name)

    var promise = path[async ? MakeAsync : Make]()

    var epilog = () => new Dir(path)
    return async ? promise.then(epilog) : epilog(promise)
  }
  makeAsync(name) {
    return this.make(name, Async)
  }

  list(options = EmptyObject) { 
    var { async } = options
    var promise = this.path[async ? ListAsync : List]()
    var epilog = o => o.map(o => DirEntry.create(this.path.to(o.name), o))
    return async ? promise.then(epilog) : epilog(promise)
  }
  listAsync() { 
    return this.list(Async)
  }

  remove() { this.path[Remove]() }
  removeAsync() { return this.path[RemoveAsync]() }

  write(name, data, options = EmptyObject) { 
    var { async, link } = options 
    if (link)
      data = data.path
    var promise = this.path[async ? WriteAsync : Write](name, data, options) 
    var epilog = path => new (link ? SymbolicLink : File)(path)
    return async ? promise.then(epilog) : epilog(promise)
  }
  writeAsync(name, data, options = EmptyObject) { 
    return this.write(name, data, { ...options, ...Async }) 
  }
}

class FileOrLink extends DirEntry {
  constructor(path) { super(path) }

  copy(dir, options = EmptyObject) { 
    assert.ok(dir instanceof Dir)
    var { name, async } = options
    var promise = this.path[async ? CopyAsync : Copy](dir.path, { name })
    var epilog = o => new this.constructor(o)
    return async ? promise.then(epilog) : epilog(promise)
  }
  copyAsync(dir, options = EmptyObject) { 
    return this.copy(dir, { ...options, ...Async })
  }

  read(options = EmptyObject) { 
    var { async, link, encoding = Utf8 } = options
    var promise = this.path[async ? ReadAsync : Read]({ encoding, link, async }) 

    var epilog = content => {
      if (!link) 
        return content

      assert(content instanceof PathBuilder)
      var promise = content[async ? StatAsync : Stat]()
      
      var epilog = stat => DirEntry.create(content, stat)
      return async ? promise.then(epilog) : epilog(promise)
    }
    return async ? promise.then(epilog) : epilog(promise)
  }
  readAsync(options = EmptyObject) { 
    return this.read({ ...options, ...Async }) 
  }

  unlink() { return this.path[Unlink]() }
  unlinkAsync() { return this.path[UnlinkAsync]() }
}

class File extends FileOrLink {
  constructor(path) { super(path) }
  get kind() { return Kind.File }
  get isFile() { return true }
}

class SymbolicLink extends FileOrLink {
  constructor(path) { super(path) }
  get kind() { return Kind.SymbolicLink }
  get isSymbolicLink() { return true }
}

DirEntry.File = File
DirEntry.Dir = Dir
DirEntry.SymbolicLink = SymbolicLink

module.exports = DirEntry