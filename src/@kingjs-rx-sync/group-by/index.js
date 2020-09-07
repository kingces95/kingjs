var { assert,
  '@kingjs': {
    Identity,
    EmptyObject,
    EqualityComparer: { default: EqualityComparer },
    IEqualityComparer,
    IObservable,
    IObservable: { Subscribe },
    IGroupedObservable: { Key },
    ICollectibleSubject: { IsEligible },
    IObserver: { Next, Complete, Error },
    '-collections': { Dictionary },
    '-rx': {
      '-subject': { Subject, CollectibleSubject },
      '-sync-static': { create },
      '-observer': { SubscriptionTracker },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: groupBy.name }
var Timeout = Symbol('timeout')
var Debounce = 0
var Async = false

/**
 * @description Groups observations with a common key into `IGroupedObservables`
 * which in turn emit the observations. 
 * 
 * @this any The `IObservable` to group.
 * @param [keySelector] Select the key.
 * @param [options] A `groupCloser` or a pojo of the form 
 * `{ async, debounce, keyComparer, createSubject }`
 * 
 * @callback keySelector
 * @param value The value.
 * @returns Returns the key for the value.
 * 
 * @callback groupCloser
 * @param key The group's key.
 * @param value The group's next value.
 * @returns Returns `true` to complete the group.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable`.
 * 
 * @remarks If `createSubject` returns an `ICollectibleSubject`, then that group
 * will be completed when it declares itself eligible to be collected.
 * @remarks If `async`, then groups will be completed after `debounce` milliseconds 
 * unless a subsequent event with matching group key is observed in which case the 
 * completion timer is cancelled.
 * @remarks Calling `cancel` inside the `keySelector` or `groupCloser` is disallowed.
 */
function groupBy(
  keySelector = Identity,
  options = EmptyObject
) {
  assert.ok((options instanceof Function) == false)

  var { 
    async = Async,
    debounce = Debounce,
    keyEqualityComparer = EqualityComparer,
    createSubject = cancel => new Subject(cancel),
  } = options

  assert.ok(!debounce || async)
  assert.ok(keyEqualityComparer instanceof IEqualityComparer)

  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
    var groupByKey = new Dictionary({ comparer: keyEqualityComparer })

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