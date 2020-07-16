var {
  '..': { DirEntry },
  '@kingjs': {
    '-dir-entry': { Kind },
    '-fs': { 
      '-dir': { Remove, Make },
      '-promises-dir': {
        Remove: RemoveAsync,
        Make: MakeAsync
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var List
var ListAsync

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

  list() { 
    if (!List)
      List = require('@kingjs-fs-dir/list')
    return this.path[List]() 
  }
  remove() { this.path[Remove]() }

  listAsync() { 
    if (!ListAsync)
      ListAsync = require('@kingjs-fs-promises-dir/list')
    return this.path[ListAsync]() 
  }
  removeAsync() { return this.path[RemoveAsync]() }
}

module.exports = Dir