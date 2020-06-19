var { 
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-function': { Rename },
    '-rx': {
      '-observer': { create: createObserver, Check, SubscriptionTracker },
      '-sync-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Scheduler = 'Scheduler'

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
function iterate(iterator, options = EmptyObject) {
  var { name } = options
  
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

    if (name)
      task[Rename](`${name} [${Scheduler}]`)

    process.nextTick(task)
    return subscription.cancel
  })
}

module.exports = iterate