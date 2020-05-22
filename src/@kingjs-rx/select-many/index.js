var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    IPublishedObservable: { Value },
    '-rx': { Subject, from },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultSelector = o => o
var DefaultResultSelector = (o, x) => x
var DefaultIsSingleton = o => false

class SelectManySubject extends Subject {
  constructor(
    activate,
    onSubscribe) {

    super(activate, onSubscribe)

    this[Value] = { }
  }

  get values() { return this[Value] }
}

/**
 * @description Returns an `IObservable` that emits the elements selected
 * from the many `IObservable`s returned by callback optionally further
 * selecting each resulting element.
 * 
 * @this any The source `IObservable` whose each emission will be mapped to
 * an `IObservable` or iterable.
 * 
 * @param [selector] Selects many elements from each emitted element of the
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
  selector = DefaultSelector, 
  resultSelector = DefaultResultSelector,
  isSingleton = DefaultIsSingleton) {

  var observable = this

  return new SelectManySubject(
    observer => {
      var id = 0
      var count = 1
      var manyDisposes = { }

      var manyObservers = observer.values

      var dispose = observable[Subscribe](
        o => {

          // optimization prevents wrapping singletons
          if (isSingleton(o)) {
            observer[Next](resultSelector(o, o))
            return
          }

          var many = selector(o)

          if (Symbol.iterator in many)
            many = from(many)

          count++
          var manyId = id++
          manyObservers[manyId] = many
          manyDisposes[manyId] = many[Subscribe](
            x => observer[Next](resultSelector(o, x)),
            () => {
              delete manyObservers[manyId]
              delete manyDisposes[manyId]
              count--
              if (count)
                return
              observer[Complete]()
            },
            x => observer[Error](x)
          )
        },
        () => {
          count--
          if (count)
            return
          observer[Complete]()
        },
        o => {
          for (var key in manyObservers)
            manyObservers[key][Error](o)
          observer[Error](o)
        }
      )

      return () => {
        for (var key in manyDisposes)
          manyDisposes[key]()
        dispose()
      }
    },
    (self, next, finished) => {
      if (finished)
        return

      var manyObservers = self.values
      for (var key in manyObservers)
        next(manyObservers[key])
    }
  )
}

module[ExportExtension](IObservable, selectMany)
