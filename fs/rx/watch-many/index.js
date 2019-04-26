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
      IObserver: { Next },
      IGroupedObservable: { Key },
      RollingSelect, Select, SelectMany, Debounce, Pool,
      Subject, Pipe, Where, GroupBy, Distinct, Log, ToArray
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

  var dirEntries = watch(dir)
    [DirEntries](dir)

  var stats = dirEntries
    [Select](o =>
      o[DistinctStats](Path.join(dir, o[Key]))
    )



  var statPool = new TaskPool(2, 1000);
  statPool.on('drop', o => assert.fail('stat task pending queue overflow'))

  var directoryMotion = subject
    [Select](o => makeAbsolute(o))
    [Distinct]()
    [SelectMany](o => watch(o, true), (o, x) => o)


  var entryMotion = directoryMotion
    [GroupBy]()
    [SelectMany](g => g
      [Debounce](DebounceMs)
      [Pool](async () => {
        var result = await fsp.readdir(g[Key], WithFileTypes)
        result = await result
          [Pool](async o => {
            var name = o.name
            var dir = g[Key]
            var path = Path.join(dir, name)
            var stat = await fsp.stat(path)
            stat.timestamp = stat.ctime.getTime()
            stat.name = name
            return stat
          }, (o, x) => x, statPool)
          [ToArray]();
        return result[OrderBy](o => o.name)
      })
      [RollingSelect](
        o => o[0][ZipJoin](o[1], SelectName, SelectName, 
          (current, previous, name) => ({ current, previous, name })
        )
      )
      [SelectMany]()
      [Where](o => 
        !o.current || // unlink
        !o.previous || // link
        o.current.ino != o.previous.ino || // re-link
        o.current.timestamp != o.previous.timestamp // change
      ),
      (g, o) => (o.dir = g[Key], o)
    )

  // sub-directory motion is feedback
  entryMotion
    [Where](o => 
      o.current && o.current.isDirectory() ||
      o.previous && o.previous.isDirectory()
    )
    [Where](o => dirFilter(o.name, o.dir))
    [Select](o => Path.join(o.dir, o.name))
    [Pipe](subject);

  subject[Next](root);

  return entryMotion;
}

module.exports = watchMany;