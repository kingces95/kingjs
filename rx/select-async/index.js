var { 
  ['@kingjs']: {
    rx: { 
      create,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      exportExtension
    },
  }
} = require('./dependencies');

/**
 * @description Returns an `IObservable` that maps values emitted
 * from the current `IObservable`.
 * 
 * @this any The source `IObservable` whose emitted value are mapped.
 * 
 * @param callback An async function that maps each emitted value.
 * 
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function selectAsync(callback) {
  var observable = this;

  return create(function(observer) {
    return observable[Subscribe](
      o => process.nextTick(async () => {
        observer[Next](await callback(o))
      }),
      () => observer[Complete](),
      o => observer[Error](o)
    );
  });
}

exportExtension(module, IObservable, selectAsync);
