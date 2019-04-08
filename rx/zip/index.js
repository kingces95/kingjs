var {
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    rx: { 
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
      create 
    },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
  },
} = require('./dependencies');

/**
 * @description Create an `IObservable` that zips emitted values with
 * an `IEnumerable` of values.
 * 
 * @this any The source `IObservable` to zip.
 * 
 * @param value The `IEnumerable` to zip. None `IEnumerable` values will be 
 * treated like the only member of an `IEnumerable`.
 * @param callback The callback that zips the `IObservable` with the `IEnumerable`.
 * 
 * @returns An `IObservable` whose emitted values are those returned by `callback`
 * 
 * @callback
 * @param left The value pushed from the `IObservable`.
 * @param right The value pulled from the `IEnumerable`.
 * @returns Returns the value to be emitted by the zipped `IObservable`.
 * 
 * @remarks - Once the `IEnumerable` is exhausted the `IObservable` will complete
 * and then dispose itself.
 */
function zip(value, callback) {
  var observable = this;

  return create(observer => {
    var enumerator;
    var dispose;

    return dispose = observable[Subscribe](
      o => {

        if (!enumerator) {
          if (value instanceof IEnumerable)
            enumerator = value[GetEnumerator]();
          else
            observer[Next](callback(o, value))
        }

        if (!enumerator || !enumerator[MoveNext]()) {
          observer[Complete]();
          dispose();
          return;
        }

        observer[Next](callback(o, enumerator[Current]))
      },
      () => observer[Complete](),
      o => observer[Error](o)
    );
  });
}

exportExtension(module, IObservable, zip);
