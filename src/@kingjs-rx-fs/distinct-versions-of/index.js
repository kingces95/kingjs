var {
  '@kingjs': { 
    IObservable,
    '-fs': { Stat },
    '-rx': { 
      '-sync': { Select, WindowBy, DistinctUntilChanged, Regroup }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Observe distinct versions of a file. 
 * @this any An `IObservable` whose emission trigger a check to 
 * see the file has changed.
 * @param path The path whose file is observed for changes.
 * @returns Returns an `IObservable` that emits a `IGroupedObservable` 
 * with key { ino } which in turn emits the value that triggered the scan, 
 * but only if the file modified time has changed.
 * 
 * @remarks The lifetime of `IGroupedObservables` no not overlap.
 * @remarks Will also work with directory entries other than files.
 **/
function distinctVersionsOf(path) {
  return this
    [Select](o => { 
      var stats = path[Stat]()
      stats.value = o
      return stats
    })
    [WindowBy](x => x.ino)
    [Regroup](o => o
      [DistinctUntilChanged](x => x.ctimeMs)
      [Select](x => x.value)
    )
}

module[ExportExtension](IObservable, distinctVersionsOf)