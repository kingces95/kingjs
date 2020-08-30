var {
  '@kingjs': {
    EmptyObject,
    IObservable,
    '-fs-entity': { DirEntry: { Dir } },
    '-rx': { Debounce,
      '-subject': { Subject },
      '-path-sync': { List },
      '-fs': { Watch },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Noop = () => null

var DebounceMs = 100
var CreateSubject = () => new Subject(Noop)
var Dot = Dir.dot

/**
 * @description Watches a directory tree for changes.
 * @param {*} options A pojo of the form `{ dir, debounceMs, selectWatcher }` where
 * by default `dir` is the working directory, `debounceMs` is 100ms, and `selectWatcher`
 * activates a new `Subject`.
 * @returns Emits a group with `DirEntry` key for each file 
 * (or symbolicLink) which in turn emit an equivalent `DirEntry` 
 * when the the file system watcher reports the entry may have changed.
 * 
 * @remarks The file system watcher economically and reliably reports when the content
 * of a directory has been added, removed, or otherwise touched. When that happens, the
 * directory content is scanned and groups are created, completed, or emit next.
 * @remarks When a group is created, the group will immediately emit a next event.
 */
function watchLinks(options = EmptyObject) {
  var { 
    dir = Dot,
    debounceMs = DebounceMs,
    selectWatcher = CreateSubject,
  } = options

  return this
    [List](dir, {
      isLeaf: o => !o.isDirectory,
      selectChildren: dir => dir.list(),
      selectWatcher: o => selectWatcher(o)
        [Watch](o.path)
        [Debounce](debounceMs),
    })
}

module[ExportInterfaceExtension](IObservable, watchLinks)