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

var DefaultEqual = (l, r) => l == r;
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
  equal = DefaultEqual) {

  var observable = this;

  return create(observer => {
    var hasLastKey;
    var lastKey;

    return observable[Subscribe](
      o => {
        var key = DefaultKeySelector(o);

        if (hasLastKey && equal(lastKey, key));
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

exportExtension(module, IObservable, distinctUntilChanged);
