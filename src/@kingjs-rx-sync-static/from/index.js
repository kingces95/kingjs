var { 
  '@kingjs': { IObserver: { Next, Complete },
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create an `IObservable` from an interable.
 * @param iterable The iterable.
 * @returns Returns `IObservable` that emits elements in the iterable.
 * 
 * @remarks As all values are emitted synchronously, this is primarily
 * a tool for testing stateless transforms and filters.
 */
function from(iterable) {
  return create(function(observer) {
    for (var o of iterable)
      observer[Next](o)
    observer[Complete]()
  })
}

module.exports = from