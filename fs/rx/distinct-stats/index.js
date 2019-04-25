var { 
  fs: { promises: fsp }, 
  ['@kingjs']: {
    path: { makeAbsolute },
    rx: { 
      InSerial,
      DistinctUntilChanged,
      PartitionBy,

      IObservable,
    },
    reflect: { exportExtension },
  }
} = require('./dependencies')

/**
 * @description For each emission reads the `fs.stats` for `path`
 * and partitions those stats by `ino` into `IGroupedObservable`s
 * which emit only when the `ctime` changes. 
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
  
  return this
    [InSerial](() => fsp.stat(path))                    // promise -> stats
    [DistinctUntilChanged](o => o.ctime.getTime())      // where a change happened
    [PartitionBy](() => o.ino)
}

exportExtension(module, IObservable, distinctStats);