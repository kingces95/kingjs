var {
  '..': { DirEntry },
  '@kingjs': {
    '-dir-entry': { Kind }
  }
} = module[require('@kingjs-module/dependencies')]()

class SymbolicLink extends DirEntry {
  constructor(path) {
    super(Kind.SymbolicLink, path)
  }

  get isSymbolicLink() { return true }
}

module.exports = SymbolicLink