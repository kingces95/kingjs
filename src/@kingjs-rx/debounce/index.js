var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync-static': { create },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Skips observations followed within specified
 * time period by another observation.
 * @this any The observable.
 * @param window The time in milliseconds an emission must
 * be followed by no additional emission to pass through this 
 * filter.
 * @returns Returns an observable whose values are filtered by
 * emissions followed by no emissions for `duration` milliseconds.
 * 
 * @remarks Upon `this` completing, the last pending `next` event,
 * assuming there is one, is immediately emitted, followed immediately 
 * by the `complete` event. 
 */
function debounce(window) {
  return create(observer => {
    var timeout
    var value

    var clear = () => { clearTimeout(timeout); timeout = null }
    var subscription = new SubscriptionTracker(observer, clear)

    this[Subscribe](
      subscription.track({
        [Next](o) { 
          value = o
          clear()
          timeout = setTimeout(() => {
            timeout = null
            observer[Next](value)
          }, window)
        },
        [Complete]() {
          clear()
          observer[Complete]()
        },
        [Error](e) {
          clear()
          observer[Error](e)
        }
      })
    )

    return subscription.cancel
  })
}

module[ExportInterfaceExtension](IObservable, debounce)
