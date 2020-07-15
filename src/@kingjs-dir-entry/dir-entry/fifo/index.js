var {
  '..': { DirEntry },
  '@kingjs': {
    '-dir-entry': { Kind }
  }
} = module[require('@kingjs-module/dependencies')]()

class Fifo extends DirEntry {
  constructor(path) {
    super(Kind.Fifo, path)
  }

  get isFifo() { return true }
}

module.exports = Fifo