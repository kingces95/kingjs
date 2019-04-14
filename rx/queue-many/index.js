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

var Identity = o => o;

/**
 * @description Returns an `IObservable` that asynchronously emits elements 
 * selected from the `IObservable`s returned by callback optionally further
 * selecting each resulting element.
 * 
 * @this any The source `IObservable` whose each emission will be asynchronously
 * mapped to an `IObservable` or iterable.
 * 
 * @param selector Asynchronously selects many elements from each emitted 
 * element of the source `IObservable`.
 * @param [resultSelector] Synchronously selects each result.
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
function queueMany(selector = Identity, resultSelector = Identity) {
  var observable = this;

  return create(observer => {
    var id = 0;
    var manyObservers = { };
    var manyDisposes = { };

    var count = 0;
    var resolve;

    var dispose = observable[Subscribe](
      o => { 
        count++;
        process.nextTick(async () => {
          var many = await selector(o);

          if (Symbol.iterator in many)
            many = from(many);

          var manyId = id++;
          manyObservers[manyId] = many;
          manyDisposes[manyId] = many[Subscribe](
            x => observer[Next](resultSelector(o, x)),
            () => {
              delete manyObservers[manyId];
              delete manyDisposes[manyId];
              count--;
              if (resolve && !count)
                resolve();
            },
            x => {
              observer[Error](x);
              count--;
              if (resolve && !count)
                resolve();
            }
          );
        })
      },
      () => {
        resolve = () => {
          for (var key in manyObservers)
            manyObservers[key][Complete]();
          observer[Complete]();
        }
        if (!count)
          resolve();
      },
      o => {
        resolve = () => {
          for (var key in manyObservers)
            manyObservers[key][Error](o);
          observer[Error](o)
        }
        if (!count)
          resolve();
      }
    );

    return () => {
      for (var key in manyDisposes)
        manyDisposes[key]();
      dispose()
    }
  })
}

exportExtension(module, IObservable, queueMany);
