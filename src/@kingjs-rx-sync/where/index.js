var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': {
      '-observer': { Proxy, Check },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var True = o => true

/**
 * @description Filters observations based on `predicate`.
 * 
 * @param predicate The test values must pass to be emitted.
 * @returns Returns an `IObservable` which emits values 
 * which pass the predicate.
 * 
 * @callback predicate
 * @param value The value to test.
 * @returns Return `true` if the value should be emitted.
 */
function where(predicate = True) {
  return create(observer => {
    return this[Subscribe](
      observer[Proxy]({
        [Next](o) {
          if (!predicate(o))
            return
          
          this[Next](o)
        },
      })[Check]()
    )
  })
}

module[ExportExtension](IObservable, where)
