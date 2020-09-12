var {
  '@kingjs': {
    '-module': { ExportEnum },
  }
} = module[require('@kingjs-module/dependencies')]()

module[ExportEnum]([
  'File',
  'Directory',
  'Socket',
  'SymbolicLink',
  'BlockDevice',
  'CharacterDevice',
  'Fifo'
])