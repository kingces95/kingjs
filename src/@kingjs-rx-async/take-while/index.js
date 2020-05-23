var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-interface': { ExportExtension },
    '-rx': {
      '-observer': { CheckAsync },
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

    var cancel = this[Subscribe]({
      ...observer,
      [Next](o) { 
        if (!predicate(o)) {
          observer[Complete]()
          cancel()
          return
        }
        
        observer[Next](o)
      },
    }[CheckAsync]())

    return cancel
  })
}

module[ExportExtension](IObservable, takeWhile)
