var { assert,
  '@kingjs': {
    '-fs': { DirEntryKind },
  }
} = module[require('@kingjs-module/dependencies')]()

assert.ok(DirEntryKind.File)
assert.ok(DirEntryKind.Directory)
assert.ok(DirEntryKind.Socket)
assert.ok(DirEntryKind.SymbolicLink)
assert.ok(DirEntryKind.BlockDevice)
assert.ok(DirEntryKind.CharacterDevice)
assert.ok(DirEntryKind.Fifo)