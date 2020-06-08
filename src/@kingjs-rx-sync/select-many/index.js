var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Initialize, Next, Complete, Error },
    '-rx': {
      '-observer': { Proxy, Check },
      '-sync-static': { create }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

/**
 * @description Selects an `IObservable` for each emission, blends the 
 * `IObservables`, and then maps the resulting emissions from the blend.
 * 
 * @this any The original `IObservable`.
 * @param [manySelector] Selects an `IObservable` for each emission of
 * the original `IObservable`.
 * @param [resultSelector] Selects each result.
 * 
 * @callback selector
 * @param value The value to turn into an `IObservable.
 * @returns Returns an `IObservable` or a promise of an `IObservable`.
 * 
 * @callback resultSelector
 * @param value An emission from the blend of the many `IObservables`.
 * @returns Returns the value emitted. 
 * 
 * @returns Returns a new `IObservable` that emits many values for each
 * value emitted by the source `IObservable`.
 * 
 * @remarks If a selected `IObservable` emits an error then the source
 * `IObservable` is canceled. This behavior requires `SelectMany` be an
 * asynchronous `IObservable`.
 */
function selectMany(
  manySelector = Identity) {

  var count = 1
  var innerSubscriptions = new Map()
  var outerSubscription

  var cancel = () => {
    for (var innerSubscription of innerSubscriptions.values())
      innerSubscription()
    outerSubscription()
  }

  return create(observer => {

    var commonObserver = {
      [Complete]() {
        if (--count)
          return
        observer[Complete]()
      },
      [Error](e) {
        observer[Error](e)
        cancel()
      }
    }

    this[Subscribe]({
      [Initialize](o) { 
        outerSubscription = o 
      },
      [Next](o) {
        count++

        var innerObservable = manySelector(o)

        var innerSubscription = innerObservable[Subscribe]({
          [Next](o) { observer[Next](o) },
          [Complete]() { 
            innerSubscriptions.delete(innerObservable)
            observer[Complete]()
          },
          ...commonObserver,
        })

        innerSubscriptions.set(innerObservable, innerSubscription)
      },
      ...commonObserver,
    })
  }, cancel)
}

module[ExportExtension](IObservable, selectMany)
