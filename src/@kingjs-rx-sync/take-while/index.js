var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Initialize, Next, Complete },
    '-interface': { ExportExtension },
    '-rx': {
      '-observer': { Proxy },
      '-sync-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Emit while a predicate is satisfied.
 * @this any The source `IObservable` whose emission are returned.
 * @param predicate The predicate. 
 * @returns Returns an `IObservable` that emits so long as a predicate
 * is satisfied.
 * 
 * @remarks The promise will cancel its subscription the first
 * time the predicate is not satisfied.
 */
function takeWhile(predicate) {
  return create(observer => {
    var cancel
    
    return this[Subscribe](
      observer[Proxy]({
        [Initialize](o) {
          cancel = o
          this[Initialize](o)
        },
        [Next](o) { 
          if (!predicate(o)) {
            this[Complete]()
            cancel()
            return
          }
          
          this[Next](o)
        },
      })
    )
  })
}

module[ExportExtension](IObservable, takeWhile)
