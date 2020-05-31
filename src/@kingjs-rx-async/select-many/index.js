var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { Proxy, CheckAsync },
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
 * @returns Returns an `IObservable`.
 * 
 * @callback resultSelector
 * @param value An emission from the blend of the many `IObservables`.
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

    var commonObserver = observer[Proxy]({
      [Complete]() {
        if (--count)
          return
        this[Complete]()
      },
      [Error](e) {
        this[Error](e)
        cancel()
      },
    })

    var outerSubscription = this[Subscribe](
      commonObserver[Proxy]({
        [Next](o) {
          count++

          process.nextTick(async () => {
            var innerObservable = await manySelector(o)

            var innerSubscription = innerObservable[Subscribe](
              commonObserver[Proxy]({
                [Next](x) {
                  this[Next](resultSelector(x, o))
                },
                [Complete]() { 
                  this[Complete]()
                  innerSubscriptions.delete(innerObservable)
                },
              })[CheckAsync]()
            )

            innerSubscriptions.set(innerObservable, innerSubscription)
          })
        },
      })[CheckAsync]())

    var cancel = () => {
      for (var innerSubscription of innerSubscriptions.values())
        innerSubscription()
      outerSubscription()
    }

    return cancel
  })
}

module[ExportExtension](IObservable, selectMany)
