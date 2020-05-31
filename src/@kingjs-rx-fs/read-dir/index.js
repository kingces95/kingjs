var { fs: { promises: fsp }, fs,
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-fs-dir': { Read },
    '-rx': {
      '-async': { SelectMany, Latest },
      '-sync': { GroupBy, RollingSelect, Select, Regroup,
        '-static': { from: rx }
      }
    },
    '-linq': { ZipJoin, 
      '-reduction': { ToArray },
      '-static': { from: linq }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { 
  withFileTypes: true
}

/**
 * @description Given a directory, emit the current and previous directory entries.
 * @this any An `IObservable` whose emissions trigger a fresh scan of the directory.
 * @param Path The directory to scan.
 * @returns Returns an `IObservable` that emits an `IGroupedObservable` for each
 * directory entry, which in turn emits `{ name, current, previous }` where `name`
 * is the file name, and `current` and `previous` and directory entries.
 **/
function readDir(dir) {
  return this
    [Select](() => dir[Read](Options))
    [Select](o => linq(o))                              // enter linq
    [RollingSelect](o =>                                // dirEntry[] -> {outer, inner, key}[]
      o[0][ZipJoin](o[1],
        o => o.name,
        o => o.name,
        (current, previous, name) => ({ 
          current,
          previous,
          name,
        })
      )
    )
    [Select](o => o[ToArray]())                         // exit linq
    [Select](o => rx(o))                                // enter rx
    [SelectMany]()                                      // {outer, inner, key}[] -> {outer, inner, key}
    [GroupBy](                                          // new = link, next = any, complete = unlink
      o => o.name,                                      // group by entry name
      o => !o.current                                   // emit `complete` on unlinked
    )
    [Regroup](o => o
      [Select](x => x.current)
    )
}

module[ExportExtension](IObservable, readDir)