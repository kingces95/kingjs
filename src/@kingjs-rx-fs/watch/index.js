var {
  '@kingjs': {
    EmptyObject,
    IObservable,
    '-fs-entity': { InoVersionPath: { Dir } },
    '-rx': { Debounce,
      '-subject': { Subject },
      '-path': { Watch },
      '-fs': { WatchPath },
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
function watch(options = EmptyObject) {
  var { 
    dir = Dot,
    debounceMs = DebounceMs,
    selectWatcher = CreateSubject,
  } = options

  return this
    [Watch](dir, {
      isLeaf: o => !o.isDirectory,
      selectWatcher: o => 
        selectWatcher(o)
          [WatchPath](o.path)
          [Debounce](debounceMs),
      selectChildren: o => o.list(),
      selectPath: o => o.path,
      selectIdentity: o => o.ino,
      selectVersion: o => o.mtime,
      debounce: debounceMs,
    })
}

module[ExportInterfaceExtension](IObservable, watch)