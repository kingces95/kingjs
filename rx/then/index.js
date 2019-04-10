var { 
  assert,
  ['@kingjs']: {
    rx: { 
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
      create 
    },
    reflect: { 
      exportExtension
    },
  }
} = require('./dependencies');

var syncError = 'Synchronous execution detected. Use `@kingjs/rx.timer`.';

/**
 * @description Returns an `IObservable` that emits values
 * from the source `IObservable` followed by the values of
 * another `IObservable`.
 * 
 * @this any The source `IObservable`.
 * 
 * @param next The `IObservable` to emit after the source 
 * `IObservable` completes.
 * 
 * @returns Returns a new `IObservable` that emits the values
 * of two `IObservable`s, one after the other.
 */
function then(nextObservable) {
  var sourceObservable = this;
  var dispose;

  return create(observer => {
    var dispose;

    function subscribe(observable) {
      dispose = observable[Subscribe](
        o => observer[Next](o),
        () => {
          if (observable == sourceObservable) {
            assert(dispose, syncError);
            dispose();
            subscribe(nextObservable);
            return;
          }

          observer[Complete]();
        },
        o => observer[Error](o)
      );
    }
    subscribe(sourceObservable);

    return () => dispose();
  })
}

exportExtension(module, IObservable, then);
