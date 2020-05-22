var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { Checked },
      '-sync-static': { create }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

/**
 * @description Returns an `IObservable` that emits the elements selected
 * from the many `IObservable`s returned by callback optionally further
 * selecting each resulting element.
 * 
 * @this any The source `IObservable` whose each emission will be mapped to
 * an `IObservable` or iterable.
 * 
 * @param [manySelector] Selects many elements from each emitted element of the
 * source `IObservable`.
 * @param [resultSelector] Selects each result.
 * 
 * @callback selector
 * @param value The value from which many values are to be selected.
 * @returns Returns an `IObservable` or iterable
 * 
 * @callback resultSelector
 * @param value One of the many resulting values to map.
 * @returns Returns the value emitted. 
 * 
 * @returns Returns a new `IObservable` that emits many values for each
 * value emitted by the source `IObservable`.
 */
function selectMany(
  manySelector = Identity, 
  resultSelector = Identity) {

  return create(observer => {
    var count = 1
    var innerSubscriptions = new Map()

    var checkedObserver = observer
      [Checked]({ assertAsync: true })

    var commonObserver = {
      ...observer,
      [Complete]() {
        if (--count)
          return
          checkedObserver[Complete]()
      },
      [Error](e) {
        checkedObserver[Error](e)
        cancel()
      },
    }

    var outerSubscription = this[Subscribe]({
      ...commonObserver,
      [Next](o) {
        count++

        process.nextTick(async () => {
          var innerObservable = await manySelector(o)

          var innerSubscription = innerObservable[Subscribe]({
            ...commonObserver,
            [Next](x) {
              commonObserver[Next](resultSelector(x, o))
            },
            [Complete]() { 
              commonObserver[Complete]()
              innerSubscriptions.delete(innerObservable)
            },
          })

          innerSubscriptions.set(innerObservable, innerSubscription)
        })
      },
    })

    var cancel = () => {
      for (var innerSubscription of innerSubscriptions.values())
        innerSubscription()
      outerSubscription()
    }

    return cancel
  })
}

module[ExportExtension](IObservable, selectMany)
