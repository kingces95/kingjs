var {
  '@kingjs': {
    EmptyObject,
    IObservable,
    '-fs': { Link },
    '-rx': { Debounce,
      '-subject': { Subject },
      '-path': { Watch },
      '-fs': { WatchPath },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

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
  return subject
    [Watch]()
    [Materialize]()
    [Select](o => o.toString())
    [Subscribe](o => console.log(o))
}

module[ExportInterfaceExtension](IObservable, watch)