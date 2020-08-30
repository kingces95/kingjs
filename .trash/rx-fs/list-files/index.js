var { assert,
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-rx': {
      '-sync': { SelectMany,
        '-static': { of }
      },
      '-fs': { ListDir },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Directory = 'directory'
var File = 'file'
var Filter = (dir, o) => o

/**
 * @description Observe link and unlink events in a directory and its subdirectories.
 * @this any An `IObservable` whose emissions trigger a scan for changes.
 * @param dir The root of the directory tree whose link events are observed.
 * @param where Filter events that trigger a scan of a directory. 
 * @returns Returns an `IObservable` that emits an `IGroupedObservable` with key 
 * { name, type, path } for each file link discovered, which in turn emits the event 
 * that triggered the scan. 
 * 
 * @callback select
 * @param dir The path to the subdirectory.
 * @param o An `IGropedObservable` with key { name, type }, where `name` is the subdirectory name, 
 * and `type` is 'directory`, which emits a value whenever the parent directory is scanned.
 * @returns Returns an `IObservable` that emits a value requesting a scan for changes to the 
 * links in the subdirectory. Typically, emissions are ignored, and replaced with a file system watcher.
 **/
function listFiles(dir, where = Filter) {
  return where(dir, this)
    [ListDir](dir)
    [SelectMany](o => {
      var { type, name } = o[Key]
      var path = dir.to(name)

      if (type == Directory)
        return o[ListFiles](path, where)

      assert.ok(type == File)
      o[Key].path = path
      return of(o)
    })
}

module[ExportInterfaceExtension](IObservable, listFiles)
var ListFiles = module.exports