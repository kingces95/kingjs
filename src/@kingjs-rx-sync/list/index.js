var { assert,
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-rx': {
      '-sync': { Select, Take, GroupSetBy, Augment, SelectLeafs },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description List the names of a node from a tree of ids whenever an
 * event is observed for that node.
 * 
 * @param {*} root The root node.
 * @param {*} options A pojo like { selectSubject, selectNames, isLeaf } 
 * where each property is a function that takes a node.
 * @return Returns a group for each leaf whose key is an array of ids
 * representing the path to the node from the root, which in turn emits the 
 * key whenever the an event is observed ont the subject corresponding to the node.
 * 
 * @remarks The data type that represents the id must support the javascript
 * less than operator or implement IComparable.
 */
function list(root, options) {
  var { 
    selectSubject, 
    selectNames, 
  } = options

  assert(root instanceof string)

  function groupNodes(observable, path) {
    return observable
      [Take](1)
      [Augment](selectSubject(path))
      [Select](() => selectNames(path).map(o => Object.create(path).push(o)))
      [GroupSetBy]()
  }

  return groupNodes(this, [root])
    [SelectLeafs](o => { 
      var path = o[Key]
      if (!isLeaf(path))
        return groupNodes(o, path) 
    })
}

module[ExportInterfaceExtension](IObservable, list)