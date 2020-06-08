var {
  '@kingjs': {
    IObservable,
    '-fs-dir': { 
      List,
      typeOf,
    },
    '-rx': {
      '-async': { SelectMany },
      '-sync': { GroupBy, RollingSelect, Select, Regroup, Log,
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
var SelectKey = dirent => ({ 
  name: dirent.name, 
  type: typeOf(dirent) 
})

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
    [Select](() => dir[List](Options))
    [Select](o => linq(o))                              // enter linq
    [RollingSelect](o =>                                // dirEntry[] -> { cur, prev, key }[]
      o[0][ZipJoin](o[1],
        SelectKey, SelectKey,
        (current, previous, key) => ({
          current,
          previous,
          key,
        }),
        (l, r) => l.name != r.name ?
          l.name < r.name : l.type < r.type
      )
    )
    [Select](o => o[ToArray]())                         // exit linq
    [Select](o => rx(o))                                // enter rx
    [SelectMany]()                                      // { cur, prev, key }[] -> { cur, prev, key }
    [GroupBy](                                          // new = link, next = any, complete = unlink
      o => o.key.type,                                  // group by entry type
    )
    [Regroup](o => o
      [GroupBy](
        x => x.key.name,
        x => !x.current                                 // emit `complete` on unlinked
      )
      [Regroup](x => x
        [Select](y => y.current)
      )
    )
}

module[ExportExtension](IObservable, readDir)