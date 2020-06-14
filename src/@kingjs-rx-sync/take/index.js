var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync': {
        '-static': { create, empty }
      },  
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: 'take' }

/**
 * @description Report only the first `count` observation.
 * @param count The number of observations to report.
 * @returns Returns an `IObservable` that reports only the first `count`
 * observations.
 */
function take(count) {
  if (!count)
    return empty()

  return create(observer => {
    var subscription = new SubscriptionTracker(observer)
    
    this[Subscribe](
      subscription.track({
        [Next](o) { 
          this[Next](o)
          if (subscription.cancelled)
            return

          if (!--count) {
            this[Complete]()
            subscription.cancel()
            return
          }
        },
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportExtension](IObservable, take)