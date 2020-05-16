var {
  '@kingjs': { IEnumerable,
    '-module': { ExportShim },
    '-indexable': { Enumerator }
  },
} = module[require('@kingjs-module/dependencies')]()

module[ExportShim](IEnumerable, Array, {
  getEnumerator() { return new Enumerator(this) }
})