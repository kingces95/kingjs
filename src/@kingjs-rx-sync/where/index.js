var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': {
      '-observer': { Proxy },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var True = o => true
var Options = { name: where.name }

/**
 * @description Filters observations based on `predicate`.
 * 
 * @param predicate The test values must pass to be emitted.
 * @returns Returns an `IObservable` which emits values 
 * which pass the predicate.
 * 
 * @callback predicate
 * @param value The value to test.
 * @param index The number of values returned prior to `value`.
 * @returns Return `true` if the value should be emitted.
 */
function where(predicate = True) {
  return create(observer => {
    var i = 0
    return this[Subscribe](
      observer[Proxy]({
        [Next](o) {
          if (!predicate(o, i++))
            return
          
          this[Next](o)
        },
      })
    )
  }, Options)
}

module[ExportExtension](IObservable, where)
