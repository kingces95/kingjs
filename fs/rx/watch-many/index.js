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
      Log,
      Publish,
      Finalize, 
      SelectMany, 
      IObservable,
      IObserver: { Next, Complete, Error },
      IObservable: { Subscribe },
      IGroupedObservable: { Key }
    },
  }
} = require('./dependencies')

var SelectName = o => o.name
var DefaultDirFilter = () => true
var DefaultRoot = '.'
var DebounceMs = 100

var WithFileTypes = { withFileTypes: true }
var Unlink = 'unlink'
var Link = 'link'
var Change = 'change'

var DefaultSelector = watch
var DefaultDir = '.'

/**
 * @description Watches for changes is a directory and its subdirectory.
 * 
 * @param [selector] Returns an `IObservable` whose emissions result in
 * reporting any changes to directory content.
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
  selector = DefaultSelector,
  dir = DefaultDir, 
  observer) {

  return selector(dir, observer)
    [Publish](null)
    [DirEntries](dir)
    [SelectMany](o => o
      [DistinctStats](Path.join(dir, o[Key]))
      [SelectMany](
        x => watchMany(selector, x.path, x),
        (o, x) => x,
        o => !o.isDirectory
      )
    )
}

module.exports = watchMany;