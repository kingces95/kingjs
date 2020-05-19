var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx-sync-static': { create },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Report only the first `count` observation.
 * @param count The number of observations to report.
 * @returns Returns an `IObservable` that reports only the first `count`
 * observations.
 */
function take(count) {
  return create(observer => {
    var taken = 0
    return this[Subscribe]({
      ...observer,
      [Next](o) {
        if (taken == count)
          return

          taken++
        observer[Next](o)
      }
    })
  })
}

module[ExportExtension](IObservable, take)
