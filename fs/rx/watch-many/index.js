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
      RollingSelect, Select, SelectMany, Queue,
      Subject, Pipe, Where, GroupBy, Distinct, Log
    },
    linq: { ZipJoin },
  }
} = require('./dependencies');

var SelectName = o => o.name;
var WithFileTypes = { withFileTypes: true };
var Remove = 'remove';
var Add = 'add';
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
  root = '.', 
  dirFilter) {

  var subject = new Subject();

  var directoryMotion = subject
    [Select](o => makeAbsolute(o))
    [Distinct]()
    [Log]('WATCH_DIR')
    [SelectMany](o => watch(o, true), o => o);

  var entryMotion = directoryMotion
    [GroupBy]()
    [SelectMany](g => g
      [Queue](() => readDirStat(g[Key]))
      [RollingSelect](
        o => o[0][ZipJoin](o[1] || [], SelectName, SelectName, diffStat)
      )
      [SelectMany]()
      [Where](),
      (g, x) => (x.dir = g[Key], x)
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

function diffStat(current, previous) {
  var entry = current || previous;
  var event = current ? (previous ? Change : Add) : Remove;

  // return null when no changes are detected
  if (event == Change && deepEqual(current, previous))
    return null;

  return { ...entry, event };
}

module.exports = watchMany;