var {
  '@kingjs': { 
    IObservable,
    '-fs': { Stat },
    '-rx': { 
      '-sync': { DistinctUntilChanged, Do, WindowBy }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Group a stream of `Dirent`s by `ino` and emit
 * only when the timestamp or `ino` changes.
 * @param dir The directory hosting the `Dirent`s.
 * @returns Returns an `IGroupedObservable` keyed by `ino` that
 * emits `Dirent`s that have different timestamps.
 * 
 * @remarks The `IGroupedObservable` only emits one group at a
 * time; Before emitting the next group, `Complete` will have been
 * called on the previous group.
 **/
function stat(dir) {
  return this
    [Do](x => x.path = dir.to(x.name))
    [Do](x => x.stats = x.path[Stat]())
    [DistinctUntilChanged](o => ({ 
      ms: o.stats.ctimeMs, 
      ino: o.stats.ino 
    }))
    [WindowBy](x => ({
      name: x.name,
      ino: x.stats.ino
    }))
}

module[ExportExtension](IObservable, stat)