var { assert,
  '@kingjs': {
    IObservable,
    IObserver: { Initialize, Next, Complete, Error },
    IGroupedObservable,
    IGroupedObservable: { Subscribe, Key },
    '-rx': {
      '-sync': { SelectMany,
        '-static': { create, of }
      }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []
var EmptyObject = {}

/**
 * @description 
 * @this any The source `IObservable` whose emitted value are mapped.
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function materialize(keys) {
  return create(observer => {

    // stack of keys identify the group that emitted the observation
    var groupKeys = keys ? { keys } : EmptyObject

    function materializeGroup(o) {
      assert(o instanceof IGroupedObservable)

      var subgroupKeys = (keys || EmptyArray).slice()
      subgroupKeys.push(o[Key])

      // materialize group creation
      observer[Next]({ grouping: true, keys: subgroupKeys })

      // emit meta-group to be flattened by SelectMany below
      var group = materialize.call(o, subgroupKeys)
      group[Key] = null
      observer[Next](group)
    }

    return this[Subscribe]({
      [Initialize](o) {
        observer[Initialize](o)
      },
      [Next](o) { 

        // recursively materialize group
        if (o instanceof IGroupedObservable) {
          materializeGroup(o)
          return
        }

        // materialize next
        observer[Next]({ next: true, value: o, ...groupKeys })
      },
      [Complete]() {
        // materialize compete
        observer[Next]({ complete: true, ...groupKeys })
        observer[Complete]()
      },
      [Error](e) {
        // materialize error
        observer[Next]({ error: true, value: e, ...groupKeys })
        observer[Complete]()
      }
    })
  })
  [SelectMany](o => o instanceof IGroupedObservable ? o : of(o))
}

module[ExportExtension](IObservable, materialize)
