var {
  '..': { DirEntry },
  '@kingjs': {
    '-dir-entry': { Kind },
    '-fs': {
      '-file': { Copy, Read, Unlink, Write },
      '-promises-file': {
        Copy: CopyAsync,
        Read: ReadAsync,
        Unlink: UnlinkAsync,
        Write: WriteAsync
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

class File extends DirEntry {
  static create(path, data, options) { 
    path[Write](data, options) 
    return new File(path)
  }
  static async createAsync(path, data, options) { 
    await path[Write](data, options) 
    return new File(path)
  }

  constructor(path) {
    super(Kind.File, path)
  }

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

module.exports = File