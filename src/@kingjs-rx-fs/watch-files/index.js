var {
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

var Options = { withFileTypes: true }
var DebounceMs = 100

function groupDirents(dir = this[Key]) {
  return this
    [Take](1)
    [Watch](dir.path)
    [Debounce](DebounceMs)
    [Select](() => dir.list(Options))
    [GroupSetBy]()
}

function watchFiles(root) {
  var rootDir = new Dir(root)

  return groupDirents.call(this, rootDir)
    [SelectLeafs](o => { 
      if (o[Key].isDirectory) 
        return groupDirents.call(o) 
    })
}

module[ExportInterfaceExtension](IObservable, watchFiles)