var { 
  '@kingjs': { 
    IObserver: { Next, Complete },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: counter.name }
var Max = Number.MAX_SAFE_INTEGER

/**
 * @description Emit an ever incrementing count starting at zero.
 * @param count The number of emissions. Default is infinite.
 * @returns Returns `IObservable` that emits a count.
 */
function counter(count = Max) {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    var current = 0
    while (current != count && !subscription.cancelled)
      observer[Next](current++)

    if (subscription.cancelled)
      return

    observer[Complete]()
  }, Options)
}

module.exports = counter