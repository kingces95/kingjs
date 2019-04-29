var { 
  fs: { promises: fsp }, 
  ['@kingjs']: {
    path: { makeAbsolute },
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
 * @description For each emission reads a `dirEntry` array for `dir`
 * and emits a `IGroupedObservable` for each named entry found which
 * then emits its `dirEntry` or `complete` if the `dirEntry` unlinks. 
 * 
 * @param [dir] The dir whose `dirEntry`s are grouped and reported
 * for every source emission.
 * 
 * @returns Returns a `IObservable` which emits `IGroupedObservable`s
 * with the entry name for `Key` and which for each source emission
 * report the `dirEntry` or `complete` if the `dirEntry` unlinks.
 * 
 * @remarks - If a source emission is observed before the `dirEntry`s for
 * the previous emission has been read and reported, then the emission
 * is queued. Source emissions beyond that are dropped. 
 * 
 * @remarks - Promise will need to be shimmed to implement `IObservable`
 **/
function dirEntries(dir) {
  dir = makeAbsolute(dir);

  return this
    [Pool](() => fsp.readdir(dir, WithFileTypes))       // promise -> dirEntry[]
    [RollingSelect](o => o[0][ZipJoin](o[1]))           // dirEntry[] -> {currentDirEntry, name}[]
    [SelectMany]()                                      // {currentDirEntry, name}[] -> {currentDirEntry, name}
    [Log](dir)
    [GroupBy](                                          // new = link, next = any, complete = unlink
      o => o.key,                                       // group by name; name is the key
      (k, o) => null,                                   // simply raise event without any event data
      k => new Subject(),                               // activate group
      (k, o) => !o.outer                                // emit `complete` on unlinked
    )
}

exportExtension(module, IObservable, dirEntries);