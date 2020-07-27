var {
  '@kingjs': {
    '-fs': {
      '-entity': { DirEntry: { File: FileEntry, Dir: DirEntry } },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

class Link {

  static create(dirEntry, iso) {
    if (dirEntry.isFile()) return new File(dirEntry, iso)
    if (dirEntry.isDirectory()) return new Dir(dirEntry, iso)
    if (dirEntry.isSymbolicLink()) return new SymbolicLink(dirEntry, iso)
    if (dirEntry.isSocket()) return new Socket(dirEntry, iso)
    if (dirEntry.isBlockDevice()) return new BlockDevice(dirEntry, iso)
    if (dirEntry.isCharacterDevice()) return new CharacterDevice(dirEntry, iso)

    assert.ok(dirEntry.isFIFO())
    return new Fifo(dirEntry, iso)  
  }

  constructor(dirEntry, iso) {
    assert.ok(dirEntry)
    assert.ok(iso)

    this.dirEntry = dirEntry
    this.iso = iso
  }

  get path() { return dirEntry.path }
  get kind() { return dirEntry.kind }
  get name() { return dirEntry.name }

  exists() { return this.path[Exists]() }
  stat() { return this.path[Stat]() }

  existsAsync() { return this.path[ExistsAsync]() }
  statAsync() { return this.path[StatAsync]() }

  toString() { return this.path.toString() }
  get __toString() { return this.toString() }

  [Equals](o) { 
    return o instanceof Link && this.dirEntry[Equals](o.dirEntry) && this.iso == o.iso
  }

  [GetHashcode]() { 
    return this.dirEntry[GetStringHashcode]() ^ this.iso
  }

  [IsLessThan](other) {
    assert(other instanceof Link)
    if (this.name == other.name)
      return this.type < other.type
    return this.name < other.name 
  }
}

class Dir extends Link {
  static get dot() { 
    return Link.create(DirEntry.dot) 
  }
  static create(path) { 
    return Link.create(DirEntry.create(path)) 
  }
  static async createAsync(path) { 
    return Link.create(await DirEntry.createAsync(path)) 
  }

  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isDirectory() { return true }

  list() { return this.dirEntry.list() }
  remove() { this.dirEntry.remove() }

  listAsync() { return this.dirEntry.listAsync() }
  removeAsync() { return this.dirEntry.removeAsync() }
}

class File extends Link {
  static create(path, data, options) { 
    return Link.create(FileEntry.create(path, data, options))
  }
  static async createAsync(path, data, options) { 
    return Link.create(await FileEntry.createAsync(path, data, options))
  }

  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isFile() { return true }

  copy(path) { return this.path[Copy](path) }
  read() { return this.path[Read]() }
  unlink() { return this.path[Unlink]() }
  write(data, options) { return this.path[Write](data, options) }

  copyAsync(path) { return this.path[CopyAsync](path) }
  readAsync() { return this.path[ReadAsync]() }
  unlinkAsync() { return this.path[UnlinkAsync]() }
  writeAsync(data, options) { return this.path[WriteAsync](data, options) }
}

class BlockDevice extends Link {
  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isBlockDevice() { return true }
}

class CharacterDevice extends Link {
  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isCharacterDevice() { return true }
}

class Fifo extends Link {
  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isFifo() { return true }
}

class Socket extends Link {
  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isSocket() { return true }
}

class SymbolicLink extends Link {
  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isSymbolicLink() { return true }
}

Link.File = File
Link.Dir = Dir
Link.SymbolicLink = SymbolicLink
Link.CharacterDevice = CharacterDevice
Link.BlockDevice = BlockDevice
Link.Socket = Socket
Link.File = Fifo

module.exports = Link