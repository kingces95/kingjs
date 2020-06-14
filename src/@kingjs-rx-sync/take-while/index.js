var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete },
    '-interface': { ExportExtension },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: takeWhile.name }

/**
 * @description Emit while a predicate is satisfied.
 * @this any The source `IObservable` whose emission are returned.
 * @param predicate The predicate. 
 * @returns Returns an `IObservable` that emits so long as a predicate
 * is satisfied.
 * 
 * @remarks The promise will cancel its subscription the first
 * time the predicate is not satisfied.
 */
function takeWhile(predicate) {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
    
    this[Subscribe](
      subscription.track({
        [Next](o) { 
          if (!predicate(o)) {
            this[Complete]()
            subscription.cancel()
            return
          }
          
          this[Next](o)
        },
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportExtension](IObservable, takeWhile)
