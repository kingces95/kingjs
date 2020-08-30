var { assert,
  '@kingjs': {
    EmptyObject,
    IObservable,
    IObservable: { Subscribe },
    IGroupedObservable: { Key },
    ICollectibleSubject: { IsEligible },
    IObserver: { Next, Complete, Error },
    '-collections': { Dictionary: Map },
    '-rx': {
      '-subject': { Subject, CollectibleSubject },
      '-sync-static': { create },
      '-observer': { SubscriptionTracker },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o
var Options = { name: groupBy.name }
var Timeout = Symbol('timeout')
var Debounce = 0
var Async = false

function createCollectibleSubject(closeGroup) {
  return cancel => new CollectibleSubject(cancel, closeGroup)
} 

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
 * @returns Returns `true` to complete the group synchronously or the 
 * number of milliseconds after which the group will be asynchronously
 * closed. In either case, the message will not be emitted by the group.
 * Any other value will keep the group open.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable`.
 * 
 * @remarks Calling `cancel` inside the `keySelector` or `groupCloser`
 * is disallowed.
 * @remarks Any message received after an asynchronous group close 
 * message will clear the asynchronous group closure.
 */
function groupBy(
  keySelector = Identity,
  options = EmptyObject
) {
  if (options instanceof Function)
    options = { createSubject: createCollectibleSubject(options) }

  var { 
    async = Async,
    debounce = Debounce,
    createSubject = cancel => new Subject(cancel),
  } = options

  assert.ok(!debounce || async)

  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
    var groupByKey = new Map()

    function finalizeGroups(action) {
      for (var key of groupByKey.keys()) {
        var group = groupByKey.get(key)
        assert(group)

        clearTimeout(group[Timeout])

        action(group)
        if (subscription.cancelled)
          break
      }

      groupByKey.clear()
    }

    this[Subscribe](
      subscription.track({
        [Next](o) {
          var key = keySelector(o)
          assert(key !== undefined)
          assert.ok(!subscription.cancelled)

          var group = groupByKey.get(key)
          var newGroup = !group

          // group activation
          if (newGroup) {
            group = createSubject(() => {
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

          // any message clears an async group closing
          clearTimeout(group[Timeout])

          // emit observation
          group[Next](o)
          if (subscription.cancelled)
            return

          // continue accepting next events
          if (!group[IsEligible])
            return

          // complete group
          var close = () => {
            group[Complete]()
            groupByKey.delete(key)
          }

          // async
          if (async) {
            group[Timeout] = setTimeout(close, debounce)
            return
          }

          close()
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