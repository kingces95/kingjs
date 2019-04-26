var { 
  ['@kingjs']: {
    rx: { 
      create, 
      Subject,
      IObservable,
      IGroupedObservable: { Key },
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      exportExtension
    },
  }
} = require('./dependencies');

var DefaultKeySelector = o => o;
var DefaultKeyEquals = (l, r) => l == r;
var DefaultResultSelector = (k, o) => o;
var DefaultPartitionActivator = k => new Subject();

/**
 * @description Returns an `IObservable` that emits another IObservable, 
 * a 'window', that emits values with matching keys. If a new key is 
 * observed, then the window is closed and another activated. 
 * 
 * @this any The source `IObservable`.
 * 
 * @param [keySelector] A callback that selects a key for each emitted value.
 * @param [keyEquals] A callback to compare keys.
 * @param [resultSelector] A callback that maps each value before being 
 * emitted by its window.
 * @param [windowActivator] A callback to activate a Subject to act as the window.
 * 
 * @callback keySelector
 * @param value The value emitted by `this`.
 * @returns Returns a primitive key used to group the value.
 * 
 * @callback keyEquals
 * @param left The left key.
 * @param right The right key.
 * @returns Returns `true` or `false`.
 * 
 * @callback resultSelector
 * @param key The key.
 * @param value The value.
 * @returns Returns a result emitted by the window.
 * 
 * @callback windowActivator
 * @param key The key.
 * @returns Returns a Subject to act as the window.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable` that 
 * then emits source values with equal keys.
 */
function windowBy(
  keySelector = DefaultKeySelector, 
  keyEquals = DefaultKeyEquals,
  resultSelector = DefaultResultSelector,
  windowActivator = DefaultPartitionActivator) {

  var observable = this;

  return create(observer => {
    var window;

    return observable[Subscribe](
      o => {
        var key = keySelector(o);

        if (!window || !keyEquals(key, window[Key])) {

          // complete the previous window!
          if (window)
            window[Complete]();

          // activate window
          window = windowActivator(key);

          // implement IGroupedObservable
          window[Key] = key; 

          // emit window
          observer[Next](window);
        }

        var result = resultSelector(key, o);
        return window[Next](result);
      },
      () => {
        if (window)
          window[Complete]();
        observer[Complete]();
      },
      o => {
        if (window)
          window[key][Error](o);
        window[Error](o)
      }
    );
  })
}

exportExtension(module, IObservable, windowBy);
