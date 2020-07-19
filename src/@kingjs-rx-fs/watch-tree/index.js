var { assert, 
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-dir-entry': { DirEntry: { Dir } },
    '-rx': { Debounce,
      '-sync': { Select, Take, GroupSetBy, SelectLeafs, Log },
      '-fs': { Watch },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

// var DebounceMs = 100

// function groupDirents(dir = this[Key]) {
//   return this
//     [Take](1)
//     [Watch](dir.path)
//     [Debounce](DebounceMs)
//     [Select](() => dir.list())
//     [GroupSetBy]()
// }

// function watchFiles(root) {
//   var rootDir = new Dir(root)

//   return groupDirents.call(this, rootDir)
//     [SelectLeafs](o => { 
//       if (o[Key].isDirectory) 
//         return groupDirents.call(o) 
//     })
// }

function watchTree(root, options) {
  var { isNode, watchNode, debounceMs, selectChildren } = options

  function groupNodes(node = this[Key]) {
    var self = this[Take](1)

    return watchNode(self, node)
      [Debounce](debounceMs)
      [Select](() => selectChildren(node))
      [GroupSetBy]()
  }

  assert(isNode(root))
  return groupNodes.call(this, root)
    [SelectLeafs](o => { 
      if (isNode(o[Key])) 
        return groupNodes.call(o) 
    })
}

module[ExportInterfaceExtension](IObservable, watchTree)