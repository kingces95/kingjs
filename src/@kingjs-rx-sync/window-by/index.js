var { 
  assert,
  deepEquals,
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    IPublishedObservable: { Value },
    '-rx': { Subject },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultKeySelector = o => o
var DefaultKeyEquals = (l, r) => l == r
var DefaultResultSelector = (k, o) => o
var DefaultWindowActivator = k => new Subject()

/**
 * @description Returns an `IObservable` that groups observations 
 * with matching keys into 'windows' represented by an `IObservable`. 
 * If a new key is observed, then any existing window is closed and 
 * another activated. 
 * 
 * @this any The source `IObservable`.
 * 
 * @param [keySelector] A callback that selects a key for each emitted value.
 * @param [keyEquals] A callback to compare keys.
 * @param [resultSelector] A callback that maps each value before being 
 * emitted by its window.
 * @param [windowActivator] A callback to activate a Subject to act as the window.
 * 
 * @callback keySelector
 * @param value The value emitted by `this`.
 * @returns Returns a primitive key used to group the value.
 * 
 * @callback resultSelector
 * @param key The key.
 * @param value The value.
 * @returns Returns a result emitted by the window.
 * 
 * @callback windowActivator
 * @param key The key.
 * @param value The value.
 * @returns Returns a Subject to act as the window.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable` that 
 * then emits source values with equal keys.
 */
function windowBy(
  keySelector = DefaultKeySelector, 
  resultSelector = DefaultResultSelector,
  windowActivator = DefaultWindowActivator
) {

  var observable = this

  var result = new Subject(observer => {
    var window

    return observable[Subscribe](
      o => {
        var key = keySelector(o)

        if (!window || !deepEquals(key, window[Key])) {

          // complete the previous window!
          if (window)
            window[Complete]()

          // activate window
          window = result[Value] = windowActivator(o, key)

          // implement IGroupedObservable
          window[Key] = key

          // emit window
          observer[Next](window)
        }

        window[Next](resultSelector(o, key))
      },
      () => {
        if (window)
          window[Complete]()
        window = null
        observer[Complete]()
      },
      o => {
        if (window)
          window[Error](o)
        window = null
        observer[Error](o)
      }
    )
  },
  (next, finished) => {
    var window = result[Value]
    if (!window)
      return
    next(window)
  }
)

  return result
}

ExportExtension(module, IObservable, windowBy)
