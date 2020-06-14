var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete, Error },
    '-rx': {
      '-observer': { construct, SubscriptionTracker },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: 'do' }

/**
 * @description Returns an `IObservable` that spies on events.
 * @this any The source `IObservable` whose events are spied upon.
 * @param observer The observer that does the spying.
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable` modulo any side effects introduced by `observer`.
 */
function spy() {
  var actions = construct(...arguments)

  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    this[Subscribe](
      subscription.track({
        [Next](o) {
          if (actions[Next])
            actions[Next](o)

          if (subscription.cancelled)
            return

          observer[Next](o)
        },
        [Complete]() {
          if (actions[Complete])
            actions[Complete]()

          if (subscription.cancelled)
            return

          observer[Complete]()
        },
        [Error](e) {
          if (actions[Error])
            actions[Error](e)

          if (subscription.cancelled)
            return

          observer[Error](e)
        }
      }
    ))

    return subscription.cancel
  }, Options)
}

module[ExportExtension](IObservable, spy)