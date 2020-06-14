var { 
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { create: createObserver, Check, TryInitialize },
      '-sync-static': { create },
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
function generate(generator) {
  return create(function(observer) {
    var observer = createObserver(...arguments)      
    var checkedObserver = observer[Check]()

    var cancelled = false
    var cancel = () => cancelled = true
    if (!checkedObserver[TryInitialize](cancel))
      return cancel

    process.nextTick(async () => {
      var iterator = generator()
      
      while (true) {
        var next = iterator.next()

        try {
          next = await next
        }
        catch (e) {
          if (cancelled) 
            return
            
          observer[Error](e)
          return
        }

        if (cancelled) 
          return

        if (next.done) 
          break

        observer[Next](next.value)
      }

      observer[Complete]()
    })

    return cancel
  })
}

module.exports = generate