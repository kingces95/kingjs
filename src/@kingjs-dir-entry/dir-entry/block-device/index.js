var {
  '..': { DirEntry },
  '@kingjs': {
    '-dir-entry': { Kind }
  }
} = module[require('@kingjs-module/dependencies')]()

class BlockDevice extends DirEntry {
  constructor(path) {
    super(Kind.BlockDevice, path)
  }

  get isBlockDevice() { return true }
}

module.exports = BlockDevice