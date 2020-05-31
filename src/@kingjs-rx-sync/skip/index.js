var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': { 
      '-observer': { Check, Proxy },
      '-sync-static': { create }
    },
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
    return this[Subscribe](
      observer[Proxy]({
        [Next](o) {
          if (skipped++ < count)
            return
          
          this[Next](o)
        },
      })[Check]()
    )
  })
}

module[ExportExtension](IObservable, skip)
