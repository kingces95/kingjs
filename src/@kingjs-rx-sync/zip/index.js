var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-module': { ExportInterfaceExtension },
    '-rx': { 
      '-observer': { SubscriptionTracker },
      '-sync-static': { create, empty, throws }
    },
  },
} = module[require('@kingjs-module/dependencies')]()

function *Empty() { }
var ToKeyValue = (key, value)  => ({ key, value })
var Options = { name: windowBy.name }

/**
 * @description Zip observations with values pulled from a generator.
 * 
 * @this any The source `IObservable` to zip.
 * @param iterable The iterable to pull values from to zip to the generator.
 * @param callback The callback that zips values.
 * @returns An `IObservable` whose emitted values are those returned by `callback`
 * 
 * @callback
 * @param key The value pushed from the `IObservable`.
 * @param value The value pulled from the `iterable`.
 * @returns Returns the value to be emitted by the zipped `IObservable`.
 * 
 * @remarks - When `iterable` is exhausted the `IObservable` will complete and
 * will cancel its subscription to the original observable.
 * @remarks - Upon subscription the `iterable` will be created and asked to 
 * generate it's first item. If `iterable` is empty the original observable 
 * will not even be subscribed.
 * @remarks - If `iterable` returns a value, then that value is converted
 * into an error. 
 */
function zip(iterable = Empty, callback = ToKeyValue) {

  return create(observer => {
    var iterator = iterable()

    function advance() {
      try {
        return iterator.next()
      }
      catch(e) {
        return { error: true, value: e }
      }
    }

    var { done, value, error } = advance()
    if (error)
      return throws(value)[Subscribe](observer)

    if (done)
      return empty()[Subscribe](observer)

      var subscription = new SubscriptionTracker(observer)
      this[Subscribe](
      subscription.track({
        [Next](o) {

          // zip iterator with observation
          this[Next](callback(o, value))
          if (subscription.cancelled)
            return

          // advance iterator
          var next = advance()
          if (subscription.cancelled)
            return

          // the observable is canceled when the iterator is exhausted or throws
          value = next.value
          if (next.done || next.error) {

            // finalize observable
            if (next.done) 
              this[Complete]()
            else
              this[Error](next.value)

            // cancel the observable source
            subscription.cancel()
          }
        },
      })
    )

    return subscription.cancel
  }, Options)
}

module[ExportInterfaceExtension](IObservable, zip)