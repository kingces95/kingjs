var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Complete, Error },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: blend.name }

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
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    var completed = 0
    var observables = [this, ...arguments]
    for (var observable of observables) {
      if (subscription.cancelled)
        break

      observable[Subscribe](
        subscription.track({
          [Complete]() { 
            if (++completed != observables.length)
              return

            this[Complete]()
          },
          [Error](o) { 
            this[Error](o) 
            subscription.cancel()
          },
        }))
    }

    return subscription.cancel
  }, Options)
}

module[ExportExtension](IObservable, blend)