var {
  '@kingjs': {
    '-fs': {
      '-entity': { DirEntry: { File: FileEntry, Dir: DirEntry } },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var EmptyObject = { }
var Utf8 = 'utf8'

class Link {

  static create(dirEntry, iso) {
    if (dirEntry.isFile) return new File(dirEntry, iso)
    if (dirEntry.isDirectory) return new Dir(dirEntry, iso)

    assert.ok(dirEntry.isSymbolicLink)
    if (dirEntry.isSymbolicLink) return new SymbolicLink(dirEntry, iso)
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

  exists() { return this.dirEntry.exists() }
  existsAsync() { return this.dirEntry.existsAsync() }

  stat(options) { return this.dirEntry.stat(options) }
  statAsync(options) { return this.dirEntry.statAsync(options) }

  rename(name) { 
    return new this.constructor(this.dirEntry.rename(name)) 
  }
  renameAsync(name) { 
    return this.dirEntry.renameAsync(name)
      .then(o => new this.constructor(o)) 
  }

  toString() { return `${this.dirEntry.toString()}, iso=${this.iso}` }
  get __toString() { return this.toString() }

  [Equals](o) { 
    return o instanceof Link && this.dirEntry[Equals](o.dirEntry) && this.iso == o.iso
  }
  [GetHashcode]() { 
    return this.dirEntry[GetHashcode]() ^ this.iso
  }
  [IsLessThan](other) {
    assert(other instanceof Link)
    return this.dirEntry[IsLessThan](other.dirEntry)
  }
}

class Dir extends Link {
  static get dot() { return new Dir(DirEntry.dot) }

  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isDirectory() { return true }

  create(name) { 
    return new Dir(this.dirEntry.create(name))
  }
  async createAsync(name) { 
    return new Dir(await this.dirEntry.createAsync(name))
  }

  list() { return this.dirEntry.list() }
  listAsync() { return this.dirEntry.listAsync() }

  remove() { this.dirEntry.remove() }
  removeAsync() { return this.dirEntry.removeAsync() }

  write(name, data, options) { 
    this.dirEntry.write(name, data, options) 
  }
  writeAsync(name, data, options) { 
    return this.dirEntry.writeAsync(name, data, options) 
  }
}

class FileOrLink extends Link {
  constructor(dirEntry, iso) { super(dirEntry, iso) }

  copy(dir) { 
    return new this.constructor(
      this.dirEntry.copy(dir.dirEntry)
    )
  }
  async copyAsync(dir) { 
    return new this.constructor(
      await this.dirEntry.copyAsync(dir.dirEntry)
    )
  }

  read(options) { this.dirEntry.read(options) }
  readAsync(options) { return this.dirEntry.readAsync(options) }

  unlink() { this.dirEntry.unlink() }
  unlinkAsync() { return this.dirEntry.unlinkAsync() }
}

class File extends FileOrLink {
  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isFile() { return true }
}

class SymbolicLink extends FileOrLink {
  constructor(dirEntry, iso) { super(dirEntry, iso) }
  get isSymbolicLink() { return true }
}

Link.File = File
Link.Dir = Dir
Link.SymbolicLink = SymbolicLink

module.exports = Link