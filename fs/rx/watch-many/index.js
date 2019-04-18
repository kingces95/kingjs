var { 
  deepEqual, 
  fs: { promises: fsp }, 
  path: Path,
  ['@kingjs']: {
    path: { makeAbsolute },
    fs: { rx: { watch } },
    rx: {
      IObserver: { Next },
      IGroupedObservable: { Key },
      RollingSelect, Select, SelectMany, Debounce, Queue,
      Subject, Pipe, Where, GroupBy, Distinct, Log
    },
    linq: { ZipJoin },
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
  root = DefaultRoot, 
  dirFilter = DefaultDirFilter) {

  var subject = new Subject();

  var directoryMotion = subject
    [Select](o => makeAbsolute(o))
    [Distinct]()
    [SelectMany](o => watch(o, true), (o, x) => o)

  var entryMotion = directoryMotion
    [GroupBy]()
    [SelectMany](g => g
      [Debounce](DebounceMs)
      [Queue](() => readDirStat(g[Key]))
      [RollingSelect](
        o => o[0][ZipJoin](o[1], SelectName, SelectName, 
          (current, previous) => ({ current, previous })
        )
      )
      [SelectMany](selectManyLinkEvents)
      [Where](),
      (g, o) => (o.dir = g[Key], o)
    )

  // report sub-directory motion as feedback
  entryMotion
    [Where](o => o.stat.isDirectory())
    [Where](o => dirFilter(o.name, o.dir))
    [Select](o => Path.join(o.dir, o.name))
    [Pipe](subject);

  subject[Next](root);

  return entryMotion;
}

async function readDirStat(dir) {
  var stats = [];

  try { 
    var entries = await fsp.readdir(dir, WithFileTypes);
    entries.sort(SelectName);

    for (var i = 0; i < entries.length; i++) {
      var name = entries[i].name;
      var path = Path.join(dir, name);

      try { 
        var stat = await fsp.stat(path);
        stats.push({ name, stat }); 
      } catch(e) { }
    }
  }
  catch(e) { }

  return stats;
}

function* selectManyLinkEvents(zip) {
  for (var { current, previous } of zip) {
    var entry = current || previous;
    var event = current ? (previous ? Change : Link) : Unlink;
  
    // return null when no changes are detected
    if (event == Change) {
      var sameCtime = current.stat.ctime.getTime() == previous.stat.ctime.getTime();
      var sameIno = current.stat.ino == previous.stat.ino;
    
      if (sameCtime && sameIno)
        continue;
  
      if (!sameIno) {
        yield { ...previous, event: Unlink };
        event = Link;
      }
    } 
  
    yield { ...entry, event };
  }
}

module.exports = watchMany;