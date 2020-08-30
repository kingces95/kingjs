var { 
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-promise': { sleep },
    '-rx': {
      '-observer': { create: createObserver, Check, SubscriptionTracker },
      '-sync-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Convert an asynchronous iterator into a `IObservable`.
 * @param iterator The asynchronous iterator.
 * @returns Returns `IObservable` that emits elements pulled from the iterator.
 * 
 * @remarks If `iterator` exits normally, complete is emitted.
 * @remarks If `iterator` throws an exception, the exception is caught and
 * emitted as an error. Note, exceptions thrown while processing events are unhandled.
 * @remarks Cancellation is checked before emitting any event.
 */
function iterate(iterator) {
  return create(function(uncheckedObserver) {
    var uncheckedObserver = createObserver(...arguments)      
    var observer = uncheckedObserver[Check]()
    var subscription = new SubscriptionTracker(observer)
    var task = async () => {
      while (true) {
        var next = iterator.next()

        try {
          next = await next
          if (subscription.cancelled) 
            return

          if (next.done) 
            break

          observer[Next](next.value)
          if (subscription.cancelled) 
            return
        }
        catch (e) {
          if (subscription.cancelled) 
            return
            
          observer[Error](e)
          return
        }
      }

      observer[Complete]()
    }

    process.nextTick(task)
    return subscription.cancel
  })
}

module.exports = iterate