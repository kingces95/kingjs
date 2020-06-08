var { 
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
var False = () => false

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
  keySelector = Identity, 
  groupCloser = False
) {

  return create(observer => {
    var groupByKey = new Map()
    var groups = new Set()

    function deleteGroup(key, group) {
      // guard against a new group being added with an old key
      if (group && !groups.has(group))
        return

      groups.delete(group)
      groupByKey.delete(key)
    }

    function clearGroups() {
      groupByKey.clear()
      groups.clear()
    }

    return this[Subscribe]({
      [Initialize](o) { 
        observer[Initialize](o)
      },
      [Next](o) {
        var key = keySelector(o)
        var group = groupByKey.get(key)

        // group activation
        if (!group) {

          // cache groupObserver
          groupByKey.set(key, group = new Subject(() => deleteGroup(key, group)))
          groups.add(group)

          // implement IGroupedObservable
          group[Key] = key
          
          // emit group observable
          observer[Next](group)
        }
        
        // group completion
        if (groupCloser(o, key)) {
          group[Complete]()
          deleteGroup(key)
          return
        }

        // group emission
        group[Next](o)
      },
      [Complete]() {
        for (var key of groupByKey.keys())
          groupByKey.get(key)[Complete]()
        clearGroups()

        observer[Complete]()
      },
      [Error](o) {
        for (var key of groupByKey.keys())
          groupByKey.get(key)[Error](o)
        clearGroups()

        observer[Error](o)
      }
    })
  })
}

module[ExportExtension](IObservable, groupBy)