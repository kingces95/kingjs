var { assert,
  '@kingjs': {
    IObservable,
    IGroupedObservable,
    IGroupedObservable: { Key },
    '-rx-sync': { Select },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

/**
 * @description Returns an `IObservable` that maps values emitted
 * from the current `IObservable`.
 * 
 * @this any The source `IObservable` whose emitted value are mapped.
 * 
 * @param callback The function that maps each emitted value.
 * @param [scheduler] The `IScheduler` to used to schedule `next` emissions.
 * 
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function rekey(callback = Identity) {
  return this[Select](o => {
    assert(o instanceof IGroupedObservable)

    var group = o[Select]()
    assert(!(group instanceof IGroupedObservable))
    
    group[Key] = callback(o[Key])
    assert(group instanceof IGroupedObservable)
    
    return group
  })
}

module[ExportInterfaceExtension](IObservable, rekey)
