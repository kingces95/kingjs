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

var identity = o => o;

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
function selectMany(selector = identity) {
  var observable = this;

  return create(observer => {
    var id = 0;
    var manyObservers = { };
    var manyDisposes = { };

    var dispose = observable[Subscribe](
      o => { 
        var manyId = id++;

        var many = manyObservers[manyId] = selector(o);

        manyDisposes[manyId] = many[Subscribe](
          o => observer[Next](o),
          () => {
            delete manyObservers[manyId];
            delete manyDisposes[manyId];
          },
          o => observer[Error](o)
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
