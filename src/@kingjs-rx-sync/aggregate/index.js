var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': {
      '-observer': { Proxy, Check },
      '-sync-static': { create }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Selector = (a, o) => o
var Options = { name: aggregate.name }

/**
 * @description Emits an accumulation of the values observed so far.
 * @this any The source `IObservable` whose emissions are accumulated.
 * @param [selector] Selects the next accumulated result. Default selects the current value.
 * @param [seed] The value to use as "the accumulated result" for the first observation. 
 * Default is an empty pojo.
 * @returns Returns an `IObservable` which emits accumulated values.
 * 
 * @callback selector
 * @param accumulator The previously accumulated result (or the seed).
 * @param current The next source emission.
 * @returns Returns the next accumulated result.
 */
function aggregate(selector = Selector, seed = EmptyObject) {
  return create(observer => {
    var accumulator = seed
    return this[Subscribe](
      observer[Proxy]({
        [Next](current) {
          var result = selector(accumulator, current)
          this[Next](result)
          accumulator = result
        },
      })
    )
  }, Options)
}

module[ExportInterfaceExtension](IObservable, aggregate)
