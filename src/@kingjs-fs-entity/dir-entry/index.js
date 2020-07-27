var { assert,
  '@kingjs': {
    Path, PathBuilder,
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-string': { GetHashcode: GetStringHashcode },
    '-fs': { Exists, Stat, Rename,
      '-entity': { Kind },
      '-file': { Copy, Read, Unlink, Write },
      '-dir': { Remove, Make, List },
      '-promises': { Rename: RenameAsync,
        Exists: ExistsAsync,
        Stat: StatAsync,
        '-file': {
          Copy: CopyAsync,
          Read: ReadAsync,
          Unlink: UnlinkAsync,
          Write: WriteAsync
        },
        '-dir': {
          Remove: RemoveAsync,
          Make: MakeAsync,
          List: ListAsync,
        },
      },
    }
  },
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var EmptyObject = { }
var Utf8 = 'utf8'

class DirEntry {

  static create(path, direntOrStat) {
    if (direntOrStat.isFile()) return new File(path)
    if (direntOrStat.isDirectory()) return new Dir(path)
    // if (direntOrStat.isSocket()) return new Socket(path)
    // if (direntOrStat.isBlockDevice()) return new BlockDevice(path)
    // if (direntOrStat.isCharacterDevice()) return new CharacterDevice(path)
    // if (direntOrStat.isFIFO()) return new isFIFO(path)
  
    assert.ok(direntOrStat.isSymbolicLink())
    return new SymbolicLink(path)
  }

  constructor(path) {
    assert.ok(path)

    this.name = path.name
    this.path = path
  }

  exists() { return this.path[Exists]() }
  existsAsync() { return this.path[ExistsAsync]() }

  stat(options) { return this.path[Stat](options) }
  statAsync(options) { return this.path[StatAsync](options) }

  rename(name, options) { 
    var { async } = options
    var path = this.path.dir.to(name)
    var promise = this.path[async ? RenameAsync : Rename](path) 
    var epilog = () => new File(path)
    return async ? promise.then(epilog) : epilog()
  }
  renameAsync(name) { return this.rename(name, Async) }

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
    if (this.name == other.name)
      return this.kind < other.kind
    return this.name < other.name 
  }
}

class Dir extends DirEntry {

  static get dot() { 
    return new Dir(Path.dot)
  }

  constructor(path) {
    super(path)
  }

  get kind() { return Kind.Directory }
  get isDirectory() { return true }

  create(name, options = EmptyObject) {
    var { async } = options 
    var path = this.path.to(name)

    var promise = path[async ? MakeAsync : Make]()

    var epilog = () => new Dir(path)
    return async ? promise.then(epilog) : epilog()
  }
  createAsync(name) {
    return this.create(name, Async)
  }

  list(options) { 
    var { async } = options
    var promise = this.path[async ? ListAsync : List]()
    var epilog = o => o.map(o => DirEntry.create(this.path.to(o.name), o))
    return async ? promise.then(epilog) : epilog()
  }
  listAsync() { 
    return this.list(Async)
  }

  remove() { this.path[Remove]() }
  removeAsync() { return this.path[RemoveAsync]() }

  write(name, data, options = EmptyObject) { 
    var { async, link } = options 
    var path = this.path.to(name)

    if (link) {
      assert.ok(data instanceof DirEntry)
      data = data.path
    }

    var promise = path[async ? WriteAsync : Write](data, options) 

    var epilog = () => new (link ? SymbolicLink : File)(path)
    return async ? promise.then(epilog) : epilog()
  }
  writeAsync(name, data, options) { 
    return this.write(name, data, { ...options, ...Async }) 
  }
}

class FileOrLink extends DirEntry {
  constructor(path) {
    super(path)
  }

  copy(dir, options) { 
    var { name, async } = options
    var path = name ? dir.to(name) : dir.to(this.path.name)
    var promise = this.path[async ? CopyAsync : Copy](path) 

    var epilog = () => new File(path)
    return async ? promise.then(epilog) : epilog()
  }
  copyAsync(dir, options) { 
    return this.copy(dir, { ...options, ...Async })
  }

  read(options) { 
    var { async, link, encoding = Utf8 } = options
    var promise = this.path[async ? ReadAsync : Read]({ encoding, link, async }) 

    var epilog = content => {
      if (!link) 
        return content

      assert(content instanceof PathBuilder)
      var promise = content[async ? StatAsync : Stat]()
      
      var epilog = stat => DirEntry.create(content, stat)
      return async ? promise.then(epilog) : epilog()
    }
    return async ? promise.then(epilog) : epilog()
  }
  readAsync(options) { 
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

class BlockDevice extends DirEntry {
  constructor(path) { super(path) }
  get kind() { return Kind.BlockDevice }
  get isBlockDevice() { return true }
}

class CharacterDevice extends DirEntry {
  constructor(path) { super(path) }
  get kind() { return Kind.CharacterDevice }
  get isCharacterDevice() { return true }
}

class Fifo extends DirEntry {
  constructor(path) { super(path) }
  get fifo() { return Kind.Fifo }
  get isFifo() { return true }
}

class Socket extends DirEntry {
  constructor(path) { super(path) }
  get kind() { return Kind.Socket }
  get isSocket() { return true }
}

DirEntry.File = File
DirEntry.Dir = Dir
DirEntry.SymbolicLink = SymbolicLink
DirEntry.CharacterDevice = CharacterDevice
DirEntry.BlockDevice = BlockDevice
DirEntry.Socket = Socket
DirEntry.File = Fifo

module.exports = DirEntry