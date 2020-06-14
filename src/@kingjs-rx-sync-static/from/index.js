var { 
  '@kingjs': { 
    IObserver: { Error, Next, Complete },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: 'from' }

/**
 * @description Create an `IObservable` from an interable.
 * @param iterable The iterable.
 * @returns Returns `IObservable` that emits elements in the iterable.
 * 
 * @remarks As all values are emitted synchronously, this is primarily
 * a tool for testing stateless transforms and filters.
 */
function from(iterable) {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
    var iterator = iterable[Symbol.iterator]()
  
    function advance() {
      try { return iterator.next() }
      catch(e) {
        return { error: true, value: e }
      }
    }

    while (true) {
      var { done, value, error } = advance()
      if (subscription.cancelled)
        return

      if (done || error) {
        if (done)
          observer[Complete]()
        else
          observer[Error](value)
        break 
      }

      observer[Next](value)
      if (subscription.cancelled)
        return
    }
  }, Options)
}

module.exports = from