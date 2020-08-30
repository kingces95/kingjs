var { assert,
  '@kingjs': {
    EmptyObject,
    EmptyArray,
    IObservable,
    IObserver: { Next, Complete, Error },
    IGroupedObservable,
    IGroupedObservable: { Subscribe, Key },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync': { SelectMany,
        '-static': { create, of }
      }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description 
 * @this any The source `IObservable` whose emitted value are mapped.
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function materialize(keys) {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    // stack of keys identifying the group that emitted the observation
    var groupKeys = keys ? { keys } : EmptyObject

    function materializeGroup(o) {
      assert(o instanceof IGroupedObservable)

      var subgroupKeys = (keys || EmptyArray).slice()
      subgroupKeys.push(o[Key])

      // materialize group creation
      this[Next]({ grouping: true, keys: subgroupKeys })
      if (subscription.cancelled)
        return

      // emit meta-group to be flattened by SelectMany below
      var group = materialize.call(o, subgroupKeys)
      group[Key] = null
      this[Next](group)
    }

    return this[Subscribe](
      subscription.track({
        [Next](o) { 
          // recursively materialize group
          if (o && o instanceof IGroupedObservable) {
            materializeGroup.call(this, o)
            return
          }

          // materialize next
          this[Next]({ next: true, value: o, ...groupKeys })
        },
        [Complete]() {
          // materialize complete
          this[Next]({ complete: true, ...groupKeys })
          if (subscription.cancelled)
            return

          this[Complete]()
        },
        [Error](e) {
          // materialize error
          this[Next]({ error: true, value: e, ...groupKeys })
          if (subscription.cancelled)
            return

          this[Complete]()
        }
      })
    )
  })
  [SelectMany](o => o instanceof IGroupedObservable ? o : of(o))
}

module[ExportInterfaceExtension](IObservable, materialize)
