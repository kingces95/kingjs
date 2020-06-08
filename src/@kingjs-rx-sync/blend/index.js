var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Initialize, Complete, Error },
    '-rx': {
      '-observer': { Proxy },
      '-sync-static': { create },
    },
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
    var subscriptions = []

    var cancelled = false
    var cancel = () => {
      cancelled = true
      subscriptions.forEach(o => o())
    }
    observer[Initialize](cancel)

    for (var observable of observables) {
      if (cancelled)
        break;

      observable[Subscribe](
        observer[Proxy]({
          [Initialize](cancelSource) {
            subscriptions.push(cancelSource)
          },
          [Complete]() { 
            if (++count != observables.length)
              return

            this[Complete]()
          },
          [Error](o) { 
            this[Error](o) 
            cancel()
          },
        }))
    }

    return cancel
  })
}

module[ExportExtension](IObservable, blend)
