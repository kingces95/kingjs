var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-subject': { Subject },
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: tap.name }
var EmptyObject = { }
var False = () => false

/**
 * @description Tap on an `IObservable` with another `IObservable`.
 * 
 * @this any The source `IObservable` whose events are spied on.
 * @param callback Callback providing the `IObservable` spy.
 * 
 * @returns Returns an `IObservable` that behaves like 
 * the source `IObservable`.
 * 
 * @callback 
 * @param observable An `IObservable` that emits the same 
 * events as the source `IObservable`.
 * 
 * @remarks Cancelling the subscription of the tapped `IObservable`
 * will not cancel the subscription to the source `IObservable`.
 */
function tap(callback, options = EmptyObject) {
  var { siphon = False } = options

  return create(observer => {
    var tapCancelled = false
    var cancelTap = () => tapCancelled = true
    var subject = new Subject(cancelTap)
    callback(subject)

    var subscription = new SubscriptionTracker(observer)

    this[Subscribe](
      subscription.track({
        [Next](o) {
          if (!tapCancelled) 
            subject[Next](o)

          if (siphon(o))
            return

          if (subscription.cancelled)
            return

          observer[Next](o)
        },
        [Complete]() {
          if (!tapCancelled)
            subject[Complete]()

          if (subscription.cancelled)
            return

          observer[Complete]()
        },
        [Error](e) {
          if (!tapCancelled)
            subject[Error](e)

          if (subscription.cancelled)
            return

          observer[Error](e)
        }
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportInterfaceExtension](IObservable, tap)