var { 
  '@kingjs': { IObserver: { Next, Complete },
    '-rx-async-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create an `IObservable` from an `IIterable`.
 * @param iterable The iterable.
 * @returns Returns `IObservable` that emits elements in the iterable.
 * 
 * @remarks As all values are emitted asynchronously; Between each 
 * emission control is passed to `setImmediate()`.
 */
function from(iterable) {
  return create(function*(observer) {
    for (var o of iterable) {
      observer[Next](o)
      yield
    }

    observer[Complete]()
  })
}

module.exports = from