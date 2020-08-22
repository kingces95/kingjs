var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: cancel.name }

/**
 * @description Cancels the source subscription before 
 * relaying the event.
 * @this IObservable The source observer.
 * @returns Returns an `IObservable` which upon observing an event, 
 * cancels it's subscription, and then emits the event itself.
 */
function cancel() {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    return this[Subscribe](
      subscription.track({
        [Next](o) {
          subscription.cancel()          
          this[Next](o)
        },
      })
    )
  }, Options)
}

module[ExportInterfaceExtension](IObservable, cancel)
