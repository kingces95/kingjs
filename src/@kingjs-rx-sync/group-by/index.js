var { assert,
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Subscribe, Key },
    IObserver: { Next, Complete, Error },
    '-collections': { Dictionary: Map },
    '-rx': {
      '-subject': { Subject },
      '-sync-static': { create },
      '-observer': { SubscriptionTracker },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o
var False = () => false
var Options = { name: groupBy.name }

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
 * 
 * @remarks Calling `cancel` inside the `keySelector` or `groupCloser`
 * is disallowed. 
 */
function groupBy(
  keySelector = Identity, 
  groupCloser = False
) {

  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
    var groupByKey = new Map()

    function finalizeGroups(action) {
      for (var key of groupByKey.keys()) {
        assert(key !== undefined)

        action(groupByKey.get(key))
        if (subscription.cancelled)
          break
      }

      groupByKey.clear()
    }

    this[Subscribe](
      subscription.track({
        [Next](o) {
          var key = keySelector(o)
          assert.ok(!subscription.cancelled)

          var group = groupByKey.get(key)

          // group activation
          if (!group) {
            group = new Subject(() => {
              if (groupByKey.get(key) != group)
                return

                groupByKey.delete(key)
            })

            // cache groupObserver
            groupByKey.set(key, group)

            // implement IGroupedObservable
            group[Key] = key
            
            // emit group observable
            observer[Next](group)
            if (subscription.cancelled)
              return
          }
          
          // group completion
          var closeGroup = groupCloser(o, key)
          assert.ok(!subscription.cancelled)

          if (closeGroup) {
            group[Complete]()
            groupByKey.delete(key)
            return
          }

          // emit observation
          group[Next](o)
        },
        [Complete]() {
          finalizeGroups(x => x[Complete]())
          if (subscription.cancelled)
            return
          
          observer[Complete]()
        },
        [Error](o) {
          finalizeGroups(x => x[Error](o))
          if (subscription.cancelled)
            return
          
          observer[Error](o)
        }
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportInterfaceExtension](IObservable, groupBy)