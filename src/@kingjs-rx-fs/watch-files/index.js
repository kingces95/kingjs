var {
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-fs-dir': { List },
    '-rx': { Debounce,
      '-sync': { Select, Take, GroupSetBy, SelectLeafs, Log },
      '-fs': { Watch },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { withFileTypes: true }
var DebounceMs = 100

function groupDirents(dir = this[Key].path) {
  return this
    [Take](1)
    [Watch](dir)
    [Debounce](DebounceMs)
    [Select](() => dir[List](Options))
    [GroupSetBy]()
}

function watchFiles(root, glob) {
  return groupDirents.call(this, root)
    [SelectLeafs](o => { 
      if (o[Key].isDirectory) 
        return groupDirents.call(o) 
    })
}

module[ExportInterfaceExtension](IObservable, watchFiles)