var { assert, fs, fs: { promises: fsPromises },
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { CompareTo },
    '-fs': { Stat },
    '-string': { GetHashcode: GetStringHashcode }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

var Types = {
  File: 'file',
  Directory: 'directory',
  SymbolicLink: 'symbolicLink',
  Socket: 'socket',
  BlockDevice: 'blockDevice',
  CharacterDevice: 'CharacterDevice',
  Fifos: 'Fifos',
}

var { File, Directory, SymbolicLink, Socket, 
  BlockDevice, CharacterDevice, Fifos } = Types

var Compare = (l, r) => l.name < r.name

function typeOf(o) {
  if (o.isFile()) return File
  if (o.isDirectory()) return Directory
  if (o.isSymbolicLink()) return SymbolicLink
  if (o.isSocket()) return Socket
  if (o.isBlockDevice()) return BlockDevice
  if (o.isCharacterDevice()) return CharacterDevice

  assert.ok(o.isFIFO())
  if (o.isFIFO()) return Fifos
}

function mapDirent(dirents, path, options) {
  if (!options.withFileTypes) {
    dirents.sort()
  }
  else {
    dirents = dirents.map(o => new DirEntry(o, path.to(o.name)))
    dirents.sort(Compare)
  }

  return dirents
}

class DirEntry {
  static list(path, options = EmptyObject) {
    var result = fs.readdirSync(path.buffer, options)
    return mapDirent(result, path, options)
  }

  static async listAsync(path, options = EmptyObject) {
    result = await fsPromises.readdir(path.buffer, options)
    return mapDirent(result, path, options)
  }

  constructor(dirent, path) {
    this.name = dirent.name
    this.type = typeOf(dirent)
    this.path = path
  }

  get isFile() { return this.type == File }
  get isDirectory() { return this.type == Directory }
  get isSymbolicLink() { return this.type == SymbolicLink }
  get isSocket() { return this.type == Socket }
  get isBlockDevice() { return this.type == BlockDevice }
  get isCharacterDevice() { return this.type == CharacterDevice }
  get isFifo() { return this.type == Fifos }

  [Equals](o) { 
    return o.name == this.name && 
      o.type == this.type 
  }
  [GetHashcode]() { 
    return this.name[GetStringHashcode]() ^ 
      this.type[GetStringHashcode]() 
  }
  [CompareTo](other) {
    assert(other instanceof DirEntry)
    if (this.name == other.name)
      return this.type < other.type
    return this.name < other.name 
  }
}

module.exports = DirEntry