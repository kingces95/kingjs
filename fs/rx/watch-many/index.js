var { 
  deepEqual, 
  fs: { promises: fsp }, 
  path: Path,
  ['@kingjs']: {
    TaskPool,
    path: { makeAbsolute },
    fs: { 
      rx: { 
        watch,
        DirEntries,
        DistinctStats,
      } 
    },
    rx: {
      Log,
      Pipe,
      Take,
      Publish,
      Finalize, 
      SelectMany, 
      IObserver: { Next },
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
      IGroupedObservable: { Key },
    },
    linq: { ZipJoin, OrderBy },
  }
} = require('./dependencies');

var SelectName = o => o.name;
var DefaultDirFilter = () => true;
var DefaultRoot = '.';
var DebounceMs = 100;

var WithFileTypes = { withFileTypes: true };
var Unlink = 'unlink';
var Link = 'link';
var Change = 'change';

/**
 * @description Watch a for file and directory events in a directory
 * and all its descendent directories.
 * 
 * @param root The root directory to start watching
 * @param {*} dirFilter A callback to filter whether a subdirectory
 * should be watched.
 * 
 * @callback dirFilter
 * @param name The name of the sub-directory.
 * @param dir The directory containing the sub-directory.
 * 
 * @returns Returns an `IObservable` that emits events for various
 * file and directory events.
 */
function watchMany(
  dir = DefaultRoot, 
  dirFilter = DefaultDirFilter) {

  var watcher = watch(dir)
  var stats = watcher
    [Publish](null)
    [DirEntries](dir)
    [SelectMany](o => o
      [DistinctStats](Path.join(dir, o[Key]))
      [SelectMany](
        o => o
          [Take](0)
          [Pipe](watchMany(o.path, dirFilter)),
        (o, x) => x,
        o => !o.isDirectory
      )
    )

  return {
    dir,
    [Next]: o => watcher[Next](o),
    [Complete]: () => watcher[Complete](dir),
    [Error]: e => watcher[Error](e),

    [Subscribe]: o => stats[Subscribe](o),
  }
}

module.exports = watchMany;