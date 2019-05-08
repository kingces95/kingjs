var { 
  path: Path,
  ['@kingjs']: {
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
      IGroupedObservable: { Key }
    },
    reflect: { createSymbol }
  }
} = require('./dependencies')

var DefaultSelector = watch
var DefaultDir = '.'
var Dir = createSymbol(module, 'dir')

/**
 * @description Watches for changes is a directory and its subdirectory.
 * 
 * @param [selector] Returns an `IObservable` whose emissions trigger the
 * reporting changes to the content of `dir`.
 * @param [dir] The directory to watch. Defaults to current directory.
 * @param [observer] An `IObservable` whose completion signals the directory
 * should no longer be observed. 
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
  selector = DefaultSelector,
  observer) {

  var result = selector(dir, observer)
    [Publish](null)
    [DirEntries](dir)
    [SelectMany](entry => entry
      [DistinctStats](Path.join(dir, entry[Key]))
      [SelectMany](
        x => watchMany(x.path, selector, x),
        (o, x) => x,
        x => !x.isDirectory
      )
    )

  return result
}

module.exports = watchMany