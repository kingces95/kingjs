var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': { 
      '-observer': { Check, Proxy },
      '-sync-static': { create }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: skip.name }

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
      })
    )
  }, Options)
}

module[ExportInterfaceExtension](IObservable, skip)
