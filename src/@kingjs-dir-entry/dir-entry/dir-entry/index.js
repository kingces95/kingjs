var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-string': { GetHashcode: GetStringHashcode },
    '-fs': { Exists, Stat,
      '-promises': { 
        Exists: ExistsAsync,
        Stat: StatAsync
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

class DirEntry {

  static create(dirent, dir) {
    DirEntry.create = require('../create')
    return DirEntry.create.call(this, dirent, dir)
  }

  constructor(type, path) {
    assert.ok(type)
    assert.ok(path)

    this.name = path.name
    this.path = path
    this.type = type
  }

  exists() { return this.path[Exists]() }
  stat() { return this.path[Stat]() }

  existsAsync() { return this.path[ExistsAsync]() }
  statAsync() { return this.path[StatAsync]() }

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