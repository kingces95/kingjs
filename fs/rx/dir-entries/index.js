var { 
  path: Path,
  fs: { promises: fsp }, 
  ['@kingjs']: {
    path: { makeAbsolute },
    fs: { rx: { PathSubject } },
    rx: { 
      Log,
      Pool,
      RollingSelect,
      SelectMany,
      GroupBy,

      Subject,
      IObservable,
    },
    linq: { 
      ZipJoin, 
    },
    reflect: { exportExtension },
  }
} = require('./dependencies')

var WithFileTypes = { 
  //encoding: 'buffer'
};

/**
 * @description For each observation, emits many `IGroupObservable`s, one
 * for each directory entry with `Key` equal to the entry name and which
 * itself emits once per observation and completes when the entry is unlinked.
 * 
 * @param [dir] The dir whose `dirEntry`s are grouped and reported
 * for every source emission.
 * 
 * @returns Returns a `IObservable` which emits `IGroupedObservable`s
 * with the entry name for `Key` and which for each source emission
 * emits `null` or `complete` if the `dirEntry` unlinks.
 * 
 * @remarks - If a source emission is observed before the `dirEntry`s for
 * the previous emission has been read and reported, then the emission
 * is queued. Source emissions beyond that are dropped. 
 * 
 * @remarks - Promise will need to be shimmed to implement `IObservable`
 **/
function dirEntries() {
  return this
    [Pool](() => fsp.readdir(this.path, WithFileTypes))     // promise -> dirEntry[]
    [RollingSelect](o => o[0][ZipJoin](o[1]))               // dirEntry[] -> {outer, inner, key}[]
    [SelectMany]()                                          // {outer, inner, key}[] -> {outer, inner, key}
    //[Log](dir)                                            // inner = previous, outer = current
    [GroupBy](                                              // new = link, next = any, complete = unlink
      o => o.key,                                           // group by entry name
      (k, o) => null,                                       // simply raise event without any event data
      k => new PathSubject(Path.join(this.path, k), this),  // activate group for entry
      (k, o) => !o.outer                                    // emit `complete` on unlinked
    )
}

exportExtension(module, IObservable, dirEntries);