var { 
  path: Path,
  ['@kingjs']: {
    path: {
      test: testPath
    },
    fs: { 
      rx: { 
        Watch,
        DirEntries,
        DistinctStats,
        PathSubject,
      } 
    },
    rx: {
      Do,
      Publish,
      SelectMany,
      GroupBy,
      Where,
      IGroupedObservable: { Key }
    },
    reflect: { createSymbol }
  }
} = require('./dependencies')

var DefaultPrune = null
var DefaultWatcher = o => o[Watch]()

/**
 * @description Watches for changes is a directory and its subdirectory.
 * 
 * @param [dir] The directory to watch. Defaults to current directory.
 * @param [observer] An `IObservable` whose completion signals the directory
 * should no longer be observed. 
 * @param [watcher] Returns an `IObservable` whose emissions trigger the
 * reporting changes to the content of `dir`.
 * @param [options] Options for filtering which directories .
 * 
 * @callback dirFilter
 * @param name The name of the sub-directory.
 * @param dir The directory containing the sub-directory.
 * 
 * @returns Returns an `IObservable` that emits events for various
 * file and directory events.
 */
function watchMany({ 
    watcher = DefaultWatcher, 
    prune = DefaultPrune 
  } = { }) {

  return watcher(this)
    [DirEntries]()
    [SelectMany](entry => entry
      [DistinctStats]()
      [Where](o => 
        !prune || 
        !o.isDirectory || 
        !testPath(entry.path, prune)
      )
      [SelectMany](
        o => entry[WatchMany]({ watcher, prune }),
        (x, o) => o,
        o => !o.isDirectory
      )
      [GroupBy](
        o => entry.path,
        (k, o) => o,
        k => new PathSubject(k)
      )
    )
  }



var WatchMany = exportExtension(module, PathSubject, watchMany);
