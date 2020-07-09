var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-fs-dir': { 
      DirEntryKind: {
        File, 
        Directory, 
        SymbolicLink, 
        Socket, 
        BlockDevice, 
        CharacterDevice, 
        Fifos 
      }
    },
    '-string': { GetHashcode: GetStringHashcode },
  }
} = module[require('@kingjs-module/dependencies')]()

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

class DirEntry {

  constructor(dirent, path) {
    this.name = dirent.name
    this.path = path
    this.type = typeOf(dirent)
  }

  get isFile() { return this.type == File }
  get isDirectory() { return this.type == Directory }
  get isSymbolicLink() { return this.type == SymbolicLink }
  get isSocket() { return this.type == Socket }
  get isBlockDevice() { return this.type == BlockDevice }
  get isCharacterDevice() { return this.type == CharacterDevice }
  get isFifo() { return this.type == Fifos }

  [Equals](o) { 
    if (!(o instanceof DirEntry))
      return false
      
    return o.name == this.name && o.type == this.type 
  }

  [GetHashcode]() { 
    return this.name[GetStringHashcode]() ^ this.type[GetHashcode]() 
  }

  [IsLessThan](other) {
    assert(other instanceof DirEntry)
    if (this.name == other.name)
      return this.type < other.type
    return this.name < other.name 
  }
}

module.exports = DirEntry