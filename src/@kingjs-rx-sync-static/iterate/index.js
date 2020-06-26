var { 
  '@kingjs': { 
    IObserver: { Error, Next, Complete },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: iterate.name }

/**
 * @description Create an `IObservable` from an iterator.
 * @param iterator The iterator.
 * @returns Returns `IObservable` that emits values pulled from the `iterator`.
 */
function iterate(iterator) {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
  
    function advance() {
      try { 
        return iterator.next() 
      }
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

module.exports = iterate