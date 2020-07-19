var { assert, 
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-rx-sync': { Select, Take, GroupSetBy, Augment, SelectLeafs, Regroup, DistinctUntilChanged },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * 
 * @param {*} root The root node. Must be `isNode`.
 * @param {*} options A pojo like { isLeaf, selectWatcher, selectChildren, 
 * selectState } where each property is a function that takes a node.
 * 
 * @remarks The collection of children returned by `selectChildren` 
 * should be immutable.
 */
function watchTree(root, options) {
  var { 
    isLeaf, 
    selectWatcher, 
    selectChildren, 
    selectState 
  } = options

  function groupNodes(observable, node) {
    return observable
      [Take](1)
      [Augment](selectWatcher(node))
      [Select](() => selectChildren(node))
      [GroupSetBy]()
  }

  return groupNodes(this, root)
    [SelectLeafs](o => { 
      var node = o[Key]
      if (!isLeaf(node))
        return groupNodes(o, node) 
    })
    [Regroup](o =>
      o[DistinctUntilChanged](selectState)
    )
}

module[ExportInterfaceExtension](IObservable, watchTree)