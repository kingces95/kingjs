var {
  '@kingjs': { 
    IObservable,
    '-fs': { Stat },
    '-rx': { 
      '-sync': { Select }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Selects stats for a path. 
 * @this any An `IObservable` whose emission are tagged with stats.
 * @param path The path whose stats are observed for changes.
 * @returns Returns an `IObservable` that emits { value, stats } where
 * `value` is the value that triggered the reading of `stats` for `path`.
 **/
function selectStat(path) {
  return this
    [Select](value => ({ 
      value, 
      stat: path[Stat]() 
    }))
}

module[ExportExtension](IObservable, selectStat)