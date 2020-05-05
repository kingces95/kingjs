var { 
  fs: { promises: fsp }, 
  ['@kingjs']: {
    fs: { 
      rx: {
        PathSubject,
        StatsSubject 
      } 
    },
    rx: { 
      create, 

      Pool,
      DistinctUntilChanged,
      WindowBy,

      IObservable,
      IGroupedObservable: { Key }
    },
    reflect: { exportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns the stats for a path that have a different 
 * `ctime` than the last observed stats for the path.
 * 
 * @this any The `PathSubject` whose stats will be observed.
 * 
 * @returns Returns a `PathSubject` which emits `StatsSubjects` which
 * in turn emits `Stats` of the path.
 * 
 * @remarks - If a source emission is observed before the stat for
 * the previous emission has been read and reported, then the emission
 * is queued. Source emissions beyond that are dropped.
 * 
 * @remarks - The emitted `IGroupedObservable`s have properties
 * @remarks -- `path` - the path.
 * @remarks -- `ino` - the file system node id.
 * @remarks -- `isBlockDevice`, `isCharacterDevice`, `isDirectory`, 
 * `isFIFO`, `isFile`, `isSocket`, `isSymbolicLink` - type
 **/
function distinctStats() {
  return this
    [Pool](() => fsp.stat(this.path))                   // promise -> stats
    [DistinctUntilChanged](o => o.ctime.getTime())      // where a change happened
    [WindowBy](
      o => o.ino,                                       // detects re-create and/or type change
      (o, k) => o,
      (o, k) => new StatsSubject(o)
    )                                                   
}

exportExtension(module, PathSubject, distinctStats);