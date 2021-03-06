var {
  '@kingjs': {
    IObservable,
    '-rx': {
      '-sync': { Where },  
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Report only the first `count` observation.
 * @param count The number of observations to report.
 * @returns Returns an `IObservable` that reports only the first `count`
 * observations.
 */
function take(count) {
  return this
    [Where]((o, i) => i < count)
}

module[ExportInterfaceExtension](IObservable, take)