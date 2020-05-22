var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Complete, Error },
    '-rx-sync-static': { create },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an `IObservable` that blends this `IObservable`
 * with those passed as arguments.
 * @this any The `IObservable` whose emissions will be blended.
 * @param arguments A list of `IObservables` whose emissions will be blended.
 * @returns Returns a new `IObservable` that emits a blend of all emissions
 * of this `IObservable` and all `IObservable`s passed as arguments.
 * 
 * @remarks If any blended `IObservable`s errors, then the subscriptions to
 * all the other `IObservable`s will be canceled. 
 */
function blend() {
  var observables = [this, ...arguments]

  return create(observer => {
    var count = 0

    var subscriptions = observables
      .map(x => x[Subscribe]({
        ...observer,
        [Complete]() { 
          if (++count != observables.length)
            return
          
          observer[Complete]()
        },
        [Error](o) { 
          observer[Error](o) 
          cancel()
        },
      }))

    var cancel = () => subscriptions.forEach(o => o())

    return cancel
  }, { assertAsync: true })
}

module[ExportExtension](IObservable, blend)
