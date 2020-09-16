var {
  '@kingjs': {
    IObservable,
    '-rx': {
      '-sync': { Regroup, WindowBy, DistinctUntilChanged,
        '-path': { List }
      },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

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
  } = options

  return this
    [List](root, { 
      isLeaf, 
      selectWatcher, 
      selectChildren, 
      selectPath 
    })
    [Regroup](o => o
      [WindowBy](selectIdentity)
      [Regroup](x => x
        [DistinctUntilChanged](selectVersion)  
      )
    )
}

module[ExportInterfaceExtension](IObservable, select)