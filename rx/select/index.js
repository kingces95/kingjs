var { 
  ['@kingjs']: {
    rx: { create },
    reflect: { 
      exportExtension
    },
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error }
  }
} = require('./dependencies');

/**
 * @description Returns an `IObservable` that maps values emitted
 * from the current `IObservable`.
 * 
 * @this any The `IObservable` whose emitted value are mapped.
 * 
 * @param callback The function that maps each emitted value.
 * 
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function map(callback) {
  var observable = this;

  return create(observer => {
    return observable[Subscribe](
      o => observer[Next](callback(o)),
      () => observer[Complete](),
      o => observer[Error](o)
    );
  })
}

exportExtension(module, IObservable, map);
