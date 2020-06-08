var { deepEquals,
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Subscribe, Key },
    IObserver: { Initialize, Next, Complete, Error },
    '-rx': {
      '-subject': { Subject },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

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
function windowBy(
  keySelector = Identity
) {
  return create(observer => {
    var lastKey
    var window

    return this[Subscribe]({
      [Initialize](o) { 
        observer[Initialize](o)
      },
      [Next](o) {
        var key = keySelector(o)

        if (window && !deepEquals(key, lastKey)) {
          window[Complete]()
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
        }

        // trap for self-cancelling window subscriptions
        if (!window)
          return
 
        // window emission
        window[Next](o)
      },
      [Complete]() {
        if (window)
          window[Complete]()
        window = null

        observer[Complete]()
      },
      [Error](o) {
        if (window)
          window[Error](o)
        window = null

        observer[Error](o)
      }
    })
  })
}

module[ExportExtension](IObservable, windowBy)