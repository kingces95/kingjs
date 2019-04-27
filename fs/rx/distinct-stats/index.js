var { 
  fs: { promises: fsp }, 
  ['@kingjs']: {
    path: { makeAbsolute },
    rx: { 
      Pool,
      DistinctUntilChanged,
      WindowBy,
      Spy, SelectMany, IObservable: { Subscribe },

      IObservable,
      IGroupedObservable: { Key }
    },
    reflect: { exportExtension },
  }
} = require('./dependencies')

/**
 * @description Returns a `IGroupedObservable` with `path` for a `Key` 
 * that emits `IGroupedObservable`s with `stats.ino` for `Key` that each
 * emit `stats.ino` whenever the `ctime` changes. 
 * 
 * @param [path] The path whose stat `ctime` changes are to be 
 * partitioned by `ino`.
 * 
 * @returns Returns a `IObservable` which emits `IGroupedObservable`s
 * where each completes before the next is emitted and emits whenever
 * the ctime changes between source `IObservable` emissions.
 * 
 * @remarks - If a source emission is observed before the stat for
 * the previous emission has been read and reported, then the emission
 * is queued. Source emissions beyond that are dropped. 
 **/
function distinctStats(path) {
  path = makeAbsolute(path);
  
  var result = this
    [Pool](() => fsp.stat(path))                        // promise -> stats
    [DistinctUntilChanged](o => o.ctime.getTime())      // where a change happened
    [WindowBy](o => o.ino)                              // detect re-create

  result[Key] = path;                                   // tag `IGroupedObservable` with path
  return result;
}

exportExtension(module, IObservable, distinctStats);