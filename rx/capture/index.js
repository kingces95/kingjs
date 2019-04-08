var { 
  ['@kingjs']: {
    rx: { 
      create, 
      Subject,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      is,
      exportExtension
    },
  }
} = require('./dependencies');

var Empty = new Subject();

/**
 * @description Returns an `IObservable` that emits values
 * from the source `IObservable` unless and until it emits 
 * an error at which point it emits values from a provided 
 * another `IObservable`.
 * 
 * @this any The source `IObservable`.
 * 
 * @param [value] The `IObservable` to emit after the source 
 * `IObservable` emits an error. May also be a function
 * that, given the exception, returns the `IObservable`. 
 * If omitted, then the error is swallowed and a `complete` 
 * is emitted.
 * 
 * @returns Returns a new `IObservable` that emits the values
 * of one `IObservable` followed by another `IObservable`
 * if and when the first emits an error.
 */
function capture(value) {
  var sourceObservable = this;
  var dispose;

  return create(observer => {
    var dispose;

    function subscribe(observable) {
      dispose = observable[Subscribe](
        o => observer[Next](o),
        () => observer[Complete](),
        e => {

          if (observable == sourceObservable) {
            dispose();
            if (is.function(value))
              value = value(e);

            if (!value)
              value = Empty;

            dispose = subscribe(value);
            return;
          }

          observer[Error](e);
        },
      );
    }
    subscribe(sourceObservable);

    return () => dispose();
  })
}

exportExtension(module, IObservable, capture);
