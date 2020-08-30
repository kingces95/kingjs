var { 
  '@kingjs': {
    EmptyObject,
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create an `IObservable` from an iterable object.
 * @param iterable The iterable object.
 * @returns Returns `IObservable` that emits elements in the object.
 */
function from(iterable, options = EmptyObject) {
  var { ms } = options

  return create(function*(observer) { 
    try {
      for (var o of iterable) {
        yield ms
        observer[Next](o)
      }

      yield ms
      observer[Complete]()
    }
    catch(e) {
      observer[Error](e)
    }
  })
}

module.exports = from