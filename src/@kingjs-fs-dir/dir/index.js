var { assert, fs, fs: { promises: fsPromises },
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-string': { GetHashcode: GetStringHashcode },
  }
} = module[require('@kingjs-module/dependencies')]()

class Dir extends DirEntry {

  constructor(dirent, path) {
    super(dirent, path)
  }
}

module.exports = Dir