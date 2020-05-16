var {
  '@kingjs': { IIterable, 
    '-generator': { Generator },
    '-module': { ExportShim },
  }
} = module[require('@kingjs-module/dependencies')]()

module[ExportShim](IIterable, Generator, {
  getIterator() { return this() }
})