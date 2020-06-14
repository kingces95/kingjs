var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next },
    '-rx': { 
      '-observer': { SubscriptionTracker },
      '-sync-static': { create }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o
var Options = { name: distinct.name }

/**
 * @description Skips values previously emitted.
 * 
 * @param [keySelector] A callback to select the key used to 
 * determine equality between two emitted values.
 * 
 * @returns Returns an `IObservable` of distinct values.
 */
function distinct(keySelector = Identity) {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    var keys
    this[Subscribe](
      subscription.track({
        [Next](o) {
          var key = keySelector(o)

          if (!keys)
            keys = new Set()

          if (keys.has(key))
            return
          
          this[Next](o)
          keys.add(key)
        },
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportExtension](IObservable, distinct)
