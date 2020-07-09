var {
  '@kingjs': {
    IObservable,
    '-module': { ExportInterfaceExtension },
    '-rx': {
      '-static': { timer },
      '-async': { Blend },
      '-sync': { Then,
        '-static': { throws },
      }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Zip observations with values pulled from a generator.
 * 
 * @this any The source `IObservable` to zip.
 * @param iterable The iterable to pull values from to zip to the generator.
 * @param callback The callback that zips values.
 * @returns An `IObservable` whose emitted values are those returned by `callback`
 * 
 * @callback
 * @param key The value pushed from the `IObservable`.
 * @param value The value pulled from the `iterable`.
 * @returns Returns the value to be emitted by the zipped `IObservable`.
 * 
 * @remarks - When `iterable` is exhausted the `IObservable` will ignore 
 * additional observations except for `complete` (and `error`).
 */
function timeout(ms, error, options) {
  return this[Blend](
    timer(ms, options)
      [Then](throws(error))
  )
}

module[ExportInterfaceExtension](IObservable, timeout)
