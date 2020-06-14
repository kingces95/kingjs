var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: count.name }

/**
 * @description Counts the number of next events.
 * @this any `this` The original observer.
 * @returns Returns an `IObservable` that counts the number of
 * emissions from the original observer and when the original
 * subscription completes, emits the count. 
 */
function count() {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
  
    var i = 0
    this[Subscribe](
      subscription.track({
        [Next]() { i++ },
        [Complete]() { 
          this[Next](i)
          if (subscription.cancelled)
            return

          this[Complete]()
        }
      }),
    )

    return subscription.cancel
  }, Options)
}

module[ExportExtension](IObservable, count)