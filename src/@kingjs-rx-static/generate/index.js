var { 
  '@kingjs': { EmptyObject,
    '-rx': {
      '-static': { iterate },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Convert an asynchronous generator into a `IObservable`.
 * @param generator The asynchronous generator.
 * @returns Returns `IObservable` that emits elements returned by `generator`.
 * 
 * @remarks If `generator` exits normally, complete is emitted.
 * @remarks If `generator` throws an exception, the exception is caught and
 * emitted as an error. Note, exceptions thrown while processing events are unhandled.
 * @remarks Cancellation is checked before emitting any event.
 */
function generate(generator, options = EmptyObject) {
  var iterator = generator()
  return iterate(iterator, options)
}

module.exports = generate