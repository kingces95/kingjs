var {
  '@kingjs': {
    IObservable,
    '-rx': { Debounce,
      '-subject': { Subject },
      '-sync': { Select, Augment, Do, Tap, Regroup, Materialize, 
                 Where, GroupBy, Pipe, WindowBy, CatchAndAbandon, ThenAbandon,
        '-static': { never },
        '-path': { Watch },
      },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var PathIndex = 0
var IdentityIndex = 1
var Timeout = 200 

/**
 * @description Observes nodes as they move between paths.
 * 
 * @this IObservable Observable that emits groups keyed by a path that emits 
 * that same path to indicate an event (e.g. the node may have been "touched").
 * @param {*} select Selects a node given a path.
 * @param {*} options A pojo like { isLeaf, selectWatcher, selectChildren } 
 * where each property is a function that takes a node.
 * @return Returns a group for each leaf whose key is the leaf and whose
 * emissions are also equivalent representations of the leaf.
 */
function select(root, options) {
  var { 
    isLeaf,
    selectWatcher,
    selectChildren,
    selectEntity,
    selectIdentity,
    selectVersion,
    timeout = Timeout,
  } = options

  var feedback = new Subject()

  return this
    [Watch](root, { 
      isLeaf, 
      selectWatcher, 
      selectChildren,
      selectEntity,
      selectIdentity,
      selectVersion,
    })
    [Materialize]()
    [Where](o => o.keys && o.keys.length > 1)
    [Augment](feedback)
    [GroupBy](o => o.keys[IdentityIndex], o => o.close)
    [Regroup](o => o
      [Tap](x => x
        [Debounce](timeout)
        [Where](y => y.complete)
        [Do](y => y.close = true)
        [CatchAndAbandon]()
        [ThenAbandon]()
        [Pipe](feedback), { 
        siphon: x => !x.next
      })
      [WindowBy](x => x.keys[PathIndex])
      [Regroup](y => y
        [Select](z => z.value)
      )
    )
}

module[ExportInterfaceExtension](IObservable, select)