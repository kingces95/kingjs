var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Complete, Error },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: augment.name }

/**
 * @description Augments an `IObservable` with events from other `IObservable`s.
 * @this any The `IObservable` whose emissions are augmented.
 * @param arguments The `IObservable`s whose emissions are blended into the event stream.
 * @returns Returns a new `IObservable` that emits a blend of events of this `IObservable` 
 * and augmentation's events.
 * 
 * @remarks If any `IObservable` emits an error then all are canceled. If `this` emits
 * complete, then all augmentations will be canceled.
 */
function augment() {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    this[Subscribe](
      subscription.track({
        [Complete]() { 
          this[Complete]()
          subscription.cancel()
        },
        [Error](o) { 
          this[Error](o) 
          subscription.cancel()
        },
      }))

    for (var observable of arguments) {
      assert.ok(observable)

      if (subscription.cancelled)
        break

      observable[Subscribe](
        subscription.track({
          [Complete]() { },
          [Error](o) { 
            this[Error](o) 
            subscription.cancel()
          },
        }))
    }

    return subscription.cancel
  }, Options)
}

module[ExportInterfaceExtension](IObservable, augment)