var { deepEquals, assert,
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Subscribe, Key },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-subject': { Subject },
      '-sync-static': { create },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o
var Options = { name: windowBy.name }

/**
 * @description Groups observations with a common key into `IGroupedObservables`
 * which in turn emit the observations. 
 * 
 * @this any The `IObservable` to group.
 * @param [keySelector] Select the key.
 * @param [groupCloser] Select if a group should be completed. 
 * 
 * @callback keySelector
 * @param value The value.
 * @returns Returns the key for the value.
 * 
 * @callback groupCloser
 * @param key The group's key.
 * @param value The group's next value.
 * @returns Returns `true` to complete the group instead of emitting 
 * `value` or false to emit the `value`.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable`.
 */
function windowBy(keySelector = Identity) {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
    var lastKey
    var window

    this[Subscribe](
      subscription.track({
        [Next](o) {
          var key = keySelector(o)

          if (window && !deepEquals(key, lastKey)) {
            window[Complete]()
            if (subscription.cancelled)
              return

            window = null
          }
          lastKey = key

          if (!window) {

            // activate and cache window
            window = new Subject(() => window = null)

            // implement IGroupedObservable
            window[Key] = key
            
            // emit window
            observer[Next](window)
            if (subscription.cancelled)
              return
          }

          // window emission
          assert(window)
          window[Next](o)
        },
        [Complete]() {
          if (window) {
            window[Complete]()
            if (subscription.cancelled)
              return
          }

          observer[Complete]()
        },
        [Error](e) {
          if (window) {
            window[Error](e)
            if (subscription.cancelled)
              return
          }

          observer[Error](e)
        }
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportInterfaceExtension](IObservable, windowBy)