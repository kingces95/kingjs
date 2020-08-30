var { assert,
  '@kingjs': { equal,
    EmptyObject,
    IObservable,
    IWindowedObservable: { Subscribe, Key, PreviousKey },
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
    var window = new Subject()
    window[Key] = null

    this[Subscribe](
      subscription.track({
        [Next](o) {
          var key = window[Key]
          var nextKey = keySelector(o)
          assert.ok(nextKey !== undefined)

          if (!equal(nextKey, key)) {

            // activate next window
            var nextWindow = new Subject(() => window = new Subject())

            // implement IWindowedObservable
            nextWindow[Key] = nextKey
            nextWindow[PreviousKey] = key
            
            // close current window
            window[Complete]()
            if (subscription.cancelled)
              return

            // swap windows
            window = nextWindow

            // emit next window
            observer[Next](window)
          }

          // window emission
          assert(window)
          window[Next](o)
        },
        [Complete]() {
          window[Complete]()
          if (subscription.cancelled)
            return

          observer[Complete]()
        },
        [Error](e) {
          window[Error](e)
          if (subscription.cancelled)
            return

          observer[Error](e)
        }
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportInterfaceExtension](IObservable, windowBy)