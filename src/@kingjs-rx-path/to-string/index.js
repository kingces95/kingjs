var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    '-module': { ExportInterfaceExtension },
    '-rx': {
      '-sync': { Materialize, Select },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 */
function materialize() {
  return this
    [Select](o => {
      o[Subscribe]()
    })
}

module[ExportInterfaceExtension](IObservable, materialize)
