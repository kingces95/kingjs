var {
  '@kingjs': {
    IObservable,
    '-rx': { GroupBy,
      '-subject': { CollectibleSubject },
      '-sync': { Select, Regroup, Materialize, Where, WindowBy,
        '-path': { Watch },
      },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var PathIndex = 0
var IdentityIndex = 1
var Debounce = 200 

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
    selectPath,
    selectIdentity,
    selectVersion,
    debounce = Debounce,
  } = options

  var createSubject = o => new CollectibleSubject(o, {
    isAddRef: o => o.grouping,
    isRelease: o => o.complete,
  })

  return this
    [Watch](root, { 
      isLeaf, 
      selectWatcher, 
      selectChildren,
      selectPath,
      selectIdentity,
      selectVersion,
    })
    [Materialize]()
    [Where](o => o.keys && o.keys.length > 1)
    [GroupBy](o => o.keys[IdentityIndex], { createSubject, debounce })
    [Regroup](o => o
      [WindowBy](x => x.keys[PathIndex])
      [Regroup](x => x
        [Select](y => y.value)
      )
    )
}

module[ExportInterfaceExtension](IObservable, select)