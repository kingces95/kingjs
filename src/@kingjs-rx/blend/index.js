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
 * @description Returns an `IObservable` that blends this `IObservable`
 * with those passed as arguments.
 * 
 * @this any The `IObservable` whose emissions will be blended.
 * 
 * @param arguments A list of `IObservables` whose emissions will be blended.
 * 
 * @returns Returns a new `IObservable` that emits a blend of all emissions
 * of this `IObservable` and all `IObservable`s passed as arguments.
 */
function blend() {
  var observables = [this, ...arguments];

  return create(observer => {
    var disposes = observables.map(x => x[Subscribe](
      o => observer[Next](o),
      () => observer[Complete](),
      o => observer[Error](o)
    ));

    return () => disposes.forEach(o => o());
  })
}

exportExtension(module, IObservable, blend);
