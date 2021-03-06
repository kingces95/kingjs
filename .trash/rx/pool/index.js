var {
  '@kingjs': {
    TaskPool,
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': { create },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultSelector = o => o
var DefaultResultSelector = (o, x) => x

/**
 * @description Selects an `IObservable` from each observation and
 * uses a `TaskPool` to asynchronously blend the emissions of those
 * `IObservables`.
 * 
 * @this any The source `IObservable` whose emitted values `selector`
 * transforms to `IObservable`s whose values `TaskPool` blends.
 * 
 * @param [selector] Given an emission from the source `IObservable`
 * selects an `IObservable`. Default is identity.
 * @param [resultSelector] Synchronously selects each result emission.
 * Default is identity.
 * @param [taskPool] The `TaskPool` to use to blend the emissions of
 * the `IObservables` selected by `selector`. Default is the default
 * `TaskPool`.
 * 
 * @callback selector
 * @param value The value from which many values are to be selected.
 * @returns Returns an `IObservable`.
 * 
 * @callback resultSelector
 * @param value One of the many resulting values to map.
 * @returns Returns the value emitted. 
 * 
 * @returns Returns a new `IObservable` that asynchronously blends 
 * emissions of `IObservables` selected from each emission of the 
 * source `IObservable`.
 */
function pool(
  selector = DefaultSelector,
  resultSelector = DefaultResultSelector,
  taskPool = new TaskPool()) {

  var thisObservable = this

  return create(observer => {
    var currentId = 0
    var disposers = { }

    // last man out turns off the lights
    var complete
    var count = 0
    taskPool.on('drop', () => count--)

    var dispose = thisObservable[Subscribe](
      o => { 
        count++

        taskPool.start(async () => {
          var id = currentId++
          await new Promise((resolve) => {
            disposers[id] = selector(o)[Subscribe](
              x => {
                observer[Next](resultSelector(o, x))
              },
              () => {
                delete disposers[id]
                count--
                if (complete && !count)
                  complete()
                resolve()
              },
              x => {
                observer[Error](x)
                resolve()
              }
            )
          })
        })
      },
      () => {
        complete = () => observer[Complete]()
        if (!count)
          complete()
      },
      o => observer[Error](o)
    )

    return () => {
      taskPool.dispose()
      for (var key in disposers)
        disposers[key]()
      dispose()
    }
  })
}

ExportExtension(module, IObservable, pool)
