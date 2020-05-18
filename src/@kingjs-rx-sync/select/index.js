var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx-static': { create },
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
function select(callback) {
  var observable = this
  return create(observer => {
    return observable[Subscribe]({
      ...observer,
      [Next]: o => observer[Next](callback(o)),
    })
  })
}

module[ExportExtension](IObservable, select)
