var {
  '@kingjs': { identity,
    EmptyObject,
    Comparer,
    IObservable,
    IGroupedObservable: { Key },
    '-rx-sync': { Select, Take, WatchSet, Augment, SelectLeafs, Rekey },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Preform an initial scan of the leafs of a tree and 
 * subsequent scans of leafs of a node triggered by a node watcher.
 * 
 * @param {*} root The root node.
 * @param {*} options A pojo like { isLeaf, selectWatcher, selectEntries } 
 * where each property is a function that takes a node.
 * @return Returns a group for each leaf whose key is the leaf and whose
 * emissions are equivalent representations of the leaf.
 */
function list(root, options = EmptyObject) {
  var { 
    isLeaf, 
    selectWatcher, 
    selectChildren, 
    selectPath = identity,
  } = options

  var keyComparer = Comparer.createUsingKeySelector(selectPath)

  function groupNodes(observable, node) {
    return observable
      [Take](1)
      [Augment](selectWatcher(node))
      [Select](() => selectChildren(node))
      [WatchSet]({ keyComparer })
  }

  return groupNodes(this, root)
    [SelectLeafs](o => { 
      var node = o[Key]
      if (!isLeaf(node))
        return groupNodes(o, node) 
    })
    [Rekey](o => selectPath(o))
}

module[ExportInterfaceExtension](IObservable, list)