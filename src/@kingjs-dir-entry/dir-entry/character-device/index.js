var {
  '..': { DirEntry },
  '@kingjs': {
    '-dir-entry': { Kind }
  }
} = module[require('@kingjs-module/dependencies')]()

class CharacterDevice extends DirEntry {
  constructor(path) {
    super(Kind.CharacterDevice, path)
  }

  get isCharacterDevice() { return true }
}

module.exports = CharacterDevice