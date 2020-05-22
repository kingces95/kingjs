var { 
  '@kingjs': { IObserver: { Next, Complete },
    '-rx-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

var Zero = () => 0
/**
 * @description Create an `IObservable` from an interable.
 * @param iterable The iterable.
 * @returns Returns `IObservable` that emits elements in the iterable.
 * 
 * @remarks As all values are emitted asynchronously; Between each emission
 * control is passed to `setTimeout()`.
 */
function from(iterable, delay = Zero) {
  return create(function*(observer) {
    yield delay()
 
    for (var o of iterable) {
      observer[Next](o)
      yield delay(o)
    }

    observer[Complete]()
  })
}

module.exports = from