var { 
  deepEquals,
  '@kingjs': {
    rx: { 
      create,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      ExportExtension
    },
  }
} = module[require('@kingjs-module/dependencies')]();

var DefaultKeySelector = o => o;

/**
 * @description Returns an `IObservable` whose each value is
 * distinct from the previously emitted value.
 * 
 * @param [keySelector] A callback to select the key used to 
 * determine equality between two emitted values.
 * @param [equal] An call back which determines if two keys
 * are equal.
 * 
 * @returns Returns an `IObservable` whose each value is
 * distinct from the previously emitted value.
 */
function distinctUntilChanged(
  keySelector = DefaultKeySelector, 
  equal = deepEquals) {

  var observable = this;

  return create(observer => {
    var hasLastKey;
    var lastKey;

    return observable[Subscribe](
      o => {
        var key = keySelector(o);

        if (hasLastKey && equal(lastKey, key))
          return;
        
        observer[Next](o);
        lastKey = key;
        hasLastKey = true;
      },
      () => observer[Complete](),
      o => observer[Error](o)
    );
  })
}

ExportExtension(module, IObservable, distinctUntilChanged);
