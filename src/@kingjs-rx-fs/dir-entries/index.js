var { 
  path: Path,
  fs: { promises: fsp }, 
  '@kingjs': {
    fs: { rx: { PathSubject } },
    rx: { 
      Log,
      Pool,
      RollingSelect,
      SelectMany,
      GroupBy,
    },
    '-linq': { 
      ZipJoin, 
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var WithFileTypes = { 
  withFileTypes: true,
  //encoding: 'buffer'
}

/**
 * @description Given a directory returns the directories entries.
 * 
 * @this any A directory represented by a `PathSubject` whose contents
 * are to be emitted.
 * 
 * @returns Returns an `IObservable` that emits a `PathSubject`
 * for each directory entry each which in turn emit a `DirEntry` for 
 * every emission of the source `PathSubject`.
 * 
 * @remarks - If a source emission is observed before the `dirEntry`s for
 * the previous emission has been read and reported, then the emission
 * is queued. Source emissions beyond that are dropped. 
 * 
 * @remarks - Promise will need to be shimmed to implement `IObservable`
 * 
 * @remarks - A path unlinked between source `PathSubject` emissions results
 * in completion of the previously emitted `PathSubject` for the unlinked path.
 **/
function dirEntries() {
  return this
    [Pool](() => fsp.readdir(this.path, WithFileTypes))     // promise -> dirEntry[]
    [RollingSelect](o => o[0]                               // dirEntry[] -> {outer, inner, key}[]
      [ZipJoin](o[1],
        o => o.name,
        o => o.name
      )
    )              
    [SelectMany]()                                          // {outer, inner, key}[] -> {outer, inner, key}
    [Log]()                                                 // inner = previous, outer = current
    [GroupBy](                                              // new = link, next = any, complete = unlink
      o => o.key,                                           // group by entry name
      name => new PathSubject(name, this),                  // activate group for entry
      o => o.outer,                                         // select the current dirEnt
      o => !o.outer                                         // emit `complete` on unlinked
    )
}

class DirSubject extends PathSubject {
  constructor(dir, parent) {
    super(dir, parent, observer => {
      
    })
  }
}

ExportExtension(module, PathSubject, dirEntries)