var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Complete },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create, empty }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: then.name }

/**
 * @description Returns an `IObservable` that emits values
 * from the source `IObservable` followed by the values of
 * another `IObservable`.
 * 
 * @this any The source `IObservable`.
 * 
 * @param next The `IObservable` to emit after the source 
 * `IObservable` completes.
 * 
 * @returns Returns a new `IObservable` that emits the values
 * of two `IObservable`s, one after the other.
 */
function then(next = empty()) {  
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    this[Subscribe](
      subscription.track({
        [Complete]() {
          next[Subscribe](
            subscription.track({ })
          )
        }
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportExtension](IObservable, then)
