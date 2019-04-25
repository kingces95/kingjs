var { 
  fs: { promises: fsp }, 
  ['@kingjs']: {
    path: { makeAbsolute },
    rx: { 
      InSerial,
      RollingSelect,
      SelectMany,
      GroupBy,
    },
    linq: { 
      ZipJoin, 
    },
    reflect: { exportExtension },
  }
} = require('./dependencies')

var WithFileTypes = { withFileTypes: true };

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
 **/
function dirEntries(dir) {
  dir = makeAbsolute(dir);

  return this
    [InSerial](() => fsp.readdir(dir, WithFileTypes))   // promise -> dirEntry[]
    [RollingSelect](                                    // dirEntry[] -> {currentDirEntry, name}[]
      o => o[0][ZipJoin](o[1], 
        o => o.name, 
        o => o.name, 
        (current, previous, name) =>                    // !current => unlinked
          ({ current, name })                           // embed name because current is undefined on unlink
      )
    )
    [SelectMany]()                                      // {currentDirEntry, name}[] -> {currentDirEntry, name}
    [GroupBy](                                          // new = link, next = change, complete = unlink
      o => o.name,                                      // {currentDirEntry, name} -> name:dirEntry
      o => o.current,                                   // {currentDirEntry, name} -> dirEntry
      o => !o.current                                   // emit `complete` on unlinked
    )
}

exportExtension(module, IGroupedObservable, dirEntries);