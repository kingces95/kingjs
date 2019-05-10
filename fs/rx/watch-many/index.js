var { 
  path: Path,
  ['@kingjs']: {
    path: {
      test: testPath
    },
    fs: { 
      rx: { 
        watch,
        DirEntries,
        DistinctStats,
      } 
    },
    rx: {
      Do,
      Publish,
      SelectMany,
      Where,
      IGroupedObservable: { Key }
    },
    reflect: { createSymbol }
  }
} = require('./dependencies')

var DefaultDir = '.'
var DefaultObservable = null
var EmptyArray = []

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
function watchMany(
  dir = DefaultDir,
  observable = DefaultObservable,
  { watcher = watch, prune = null } = { }) {

  var result = watcher(dir, observable)
    [Publish](null)
    [DirEntries](dir)
    [SelectMany](entry => entry
      [DistinctStats](Path.join(dir, entry[Key]))
      [Where](
        o => !prune || !o.isDirectory || !testPath(o.path, prune)
      )
      [SelectMany](
        x => watchMany(x.path, x, { watcher, prune }),
        (o, x) => x,
        x => !x.isDirectory
      )
    )

  return result
}

module.exports = watchMany