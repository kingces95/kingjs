var { 
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-rx-sync': { Select },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

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
function regroup(callback) {
  return this[Select](o => {
    var group = callback(o)
    group[Key] = o[Key]
    return group
  })
}

module[ExportExtension](IObservable, regroup)