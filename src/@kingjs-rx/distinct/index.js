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

var DefaultEqual = (l, r) => l == r;
var DefaultKeySelector = o => o;

/**
 * @description Returns an `IObservable` whose each value is distinct.
 * 
 * @param [keySelector] A callback to select the key used to 
 * determine equality between two emitted values.
 * @param [equal] An call back which determines if two keys
 * are equal.
 * 
 * @returns Returns an `IObservable` whose each value is distinct.
 */
function distinct(
  keySelector = DefaultKeySelector, 
  equal = DefaultEqual) {

  var observable = this;

  return create(observer => {
    var keys;

    return observable[Subscribe](
      o => {
        var key = keySelector(o);

        if (!keys)
          keys = { };

        if (key in keys)
          return;
        
        observer[Next](o);
        keys[key] = undefined;
      },
      () => observer[Complete](),
      o => observer[Error](o)
    );
  })
}

exportExtension(module, IObservable, distinct);
