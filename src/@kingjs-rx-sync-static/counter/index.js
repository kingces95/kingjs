var { 
  '@kingjs': { 
    IObserver: { Next },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: 'counter' }

/**
 * @description Emit an ever incrementing count starting at zero.
 * @returns Returns `IObservable` that emits a count.
 */
function counter() {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    var count = 0
    while (!subscription.cancelled)
      observer[Next](count++)
  }, Options)
}

module.exports = counter