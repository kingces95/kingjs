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
 * @description Skips the first `count` observations.
 * @param count The number of observations to skip.
 * @returns Returns an `IObservable` that skips `count` original observations.
 */
function skip(count) {
  return create(observer => {
    var skipped = 0
    return this[Subscribe]({
      ...observer,
      [Next](o) {
        if (skipped++ < count)
          return
        
        observer[Next](o)
      },
    })
  })
}

module[ExportExtension](IObservable, skip)
