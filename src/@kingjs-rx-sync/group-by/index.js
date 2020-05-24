var { 
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { Thunk },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultKeySelector = o => o
var DefaultGroupCloser = (o, k) => false

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
function groupBy(
  keySelector = DefaultKeySelector, 
  groupCloser = DefaultGroupCloser
) {
  return create(observer => {
    var groups = new Map()

    return this[Subscribe]({
      [Next](o) {
        var key = keySelector(o)
        var group = groups.get(key)

        // group activation
        if (!group) {

          // cache groupObserver
          groups.set(key, group = new Thunk())

          // create observable for group and capture the observer upon subscription
          var groupObservable = create(groupObserver => {
            group.set(groupObserver)
            return () => groups.delete(key) 
          })

          // implement IGroupedObservable
          groupObservable[Key] = key
          
          // emit group observable
          observer[Next](groupObservable)
        }
        
        // group completion
        if (groupCloser(o, key)) {
          group[Complete]()
          groups.delete(key)
          return
        }

        // group emission
        group[Next](o)
      },
      [Complete]() {
        for (var key of groups.keys())
          groups.get(key)[Complete]()
        groups.clear()
        observer[Complete]()
      },
      [Error](o) {
        for (var key of groups.keys())
          groups.get(key)[Error](o)
        groups.clear()
        observer[Error](o)
      }
    })
  })
}

module[ExportExtension](IObservable, groupBy)