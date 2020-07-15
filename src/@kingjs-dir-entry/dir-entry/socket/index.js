var {
  '..': { DirEntry },
  '@kingjs': {
    '-dir-entry': { Kind }
  }
} = module[require('@kingjs-module/dependencies')]()

class Socket extends DirEntry {
  constructor(path) {
    super(Kind.Socket, path)
  }

  get isSocket() { return true }
}

module.exports = Socket