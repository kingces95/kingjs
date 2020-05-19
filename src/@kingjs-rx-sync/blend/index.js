var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx-sync-static': { create },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Noop = () => undefined

/**
 * @description Returns an `IObservable` that blends this `IObservable`
 * with those passed as arguments.
 * 
 * @this any The `IObservable` whose emissions will be blended.
 * 
 * @param arguments A list of `IObservables` whose emissions will be blended.
 * 
 * @returns Returns a new `IObservable` that emits a blend of all emissions
 * of this `IObservable` and all `IObservable`s passed as arguments.
 */
function blend() {
  var observables = [this, ...arguments]

  return create(observer => {
    var count = 0
    var error = false

    var disposes = observables
      .map(x => error ? Noop : x[Subscribe]({
        [Next](o) { error ? null : observer[Next](o) },
        [Error](o) { error = true; observer[Error](o) },
        [Complete]() { 
          if (++count == observables.length)
            observer[Complete]()
        }
      }))

    return () => disposes.forEach(o => o())
  })
}

module[ExportExtension](IObservable, blend)
