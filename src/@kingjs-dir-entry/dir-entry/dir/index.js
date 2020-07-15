var {
  '..': { DirEntry },
  '@kingjs': {
    '-dir-entry': { Kind },
    '-fs': { 
      '-dir': { List, Remove, Make },
      '-promises-dir': {
        List: ListAsync,
        Remove: RemoveAsync,
        Make: MakeAsync
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

class Dir extends DirEntry {

  static create(path) { 
    path[Make]()
    return new Dir(path)
  }

  static async createAsync(path) { 
    await path[MakeAsync]()
    return new Dir(path)
  }

  constructor(path) {
    super(Kind.Directory, path)
  }

  get isDirectory() { return true }

  List() { return this.path[List]() }
  Remove() { this.path[Remove]() }

  ListAsync() { return this.path[ListAsync]() }
  RemoveAsync() { return this.path[RemoveAsync]() }
}

module.exports = Dir