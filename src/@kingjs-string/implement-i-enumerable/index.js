var {
  '@kingjs': { IEnumerable,
    '-module': { ExportShim },
    '-indexable': { Enumerator }
  },
} = module[require('@kingjs-module/dependencies')]()

module[ExportShim](IEnumerable, String, {
  getEnumerator() { return new Enumerator(this) }
})