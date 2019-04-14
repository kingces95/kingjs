var {
  ['@kingjs']: {
    rx: { 
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
      create, 
      from,
    },
    reflect: {
      exportExtension
    },
  }
} = require('./dependencies');

var DefaultSelector = o => o;
var DefaultResultSelector = (o, x) => x;

/**
 * @description Returns an `IObservable` emits the elements selected
 * from the many `IObservable`s returned by callback optionally further
 * selecting each resulting element.
 * 
 * @this any The source `IObservable` whose each emission will be mapped to
 * an `IObservable` or iterable.
 * 
 * @param [selector] Selects many elements from each emitted element of the
 * source `IObservable`.
 * @param [resultSelector] Selects each resultiIdentity.
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
  resultSelector = DefaultResultSelector) {

  var observable = this;

  return create(observer => {
    var id = 0;
    var manyObservers = { };
    var manyDisposes = { };

    var dispose = observable[Subscribe](
      o => { 
        var many = selector(o);

        if (Symbol.iterator in many)
          many = from(many);

        var manyId = id++;
        manyObservers[manyId] = many;
        manyDisposes[manyId] = many[Subscribe](
          x => observer[Next](resultSelector(o, x)),
          () => {
            delete manyObservers[manyId];
            delete manyDisposes[manyId];
          },
          x => observer[Error](x)
        );
      },
      () => {
        for (var key in manyObservers)
          manyObservers[key][Complete]();
        observer[Complete]();
      },
      o => {
        for (var key in manyObservers)
          manyObservers[key][Error](o);
        observer[Error](o)
      }
    );

    return () => {
      for (var key in manyDisposes)
        manyDisposes[key]();
      dispose()
    }
  })
}

exportExtension(module, IObservable, selectMany);
