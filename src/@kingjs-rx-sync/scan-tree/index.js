var {
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-rx-sync': { Select, Take, GroupSetBy, Augment, SelectLeafs },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Preform an initial scan of the leafs of a tree and 
 * subsequent scans of leafs of a node triggered by a node watcher.
 * 
 * @param {*} root The root node. Must be `isNode`.
 * @param {*} options A pojo like { isLeaf, selectWatcher, selectChildren, 
 * selectState } where each property is a function that takes a node.
 * @return Returns a group for each leaf whose key is a leaf and whose
 * emissions are also equivalent representations of the leaf.
 * 
 * @remarks The result of `selectState` should be immutable as one version
 * is compared against subsequent versions to skip adjacent equivalent
 * emissions.
 */
function scanTree(root, options) {
  var { 
    isLeaf, 
    selectWatcher, 
    selectChildren, 
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
}

module[ExportInterfaceExtension](IObservable, scanTree)