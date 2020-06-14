var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o
var Options = { name: selectMany.name }

/**
 * @description Selects an `IObservable` for each emission, blends the 
 * `IObservables`, and then maps the resulting emissions from the blend.
 * 
 * @this any The original `IObservable`.
 * @param [manySelector] Selects an `IObservable` for each emission of
 * the original `IObservable`.
 * @param [resultSelector] Selects each result.
 * 
 * @callback selector
 * @param value The value to turn into an `IObservable.
 * @returns Returns an `IObservable` or a promise of an `IObservable`.
 * 
 * @callback resultSelector
 * @param value An emission from the blend of the many `IObservables`.
 * @returns Returns the value emitted. 
 * 
 * @returns Returns a new `IObservable` that emits many values for each
 * value emitted by the source `IObservable`.
 * 
 * @remarks If a selected `IObservable` emits an error then the source
 * `IObservable` is canceled. This behavior requires `SelectMany` be an
 * asynchronous `IObservable`.
 */
function selectMany(manySelector = Identity) {
  return create(observer => {
    var count = 1
    var subscription = new SubscriptionTracker(observer)

    var commonObserver = {
      [Complete]() {
        if (--count)
          return
        observer[Complete]()
      },
      [Error](e) {
        observer[Error](e)
        subscription.cancel()
      }
    }

    this[Subscribe](
      subscription.track({
        [Next](o) {
          count++
          var many = manySelector(o)
          many[Subscribe](
            subscription.track({
              ...commonObserver,
            })
          )
        },
        ...commonObserver,
      })
    )

    return SubscriptionTracker.cancel
  }, Options)
}

module[ExportExtension](IObservable, selectMany)
