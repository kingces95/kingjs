var {
  ['@kingjs']: {
    getGenerator,
    reflect: { 
      exportExtension
    },
    rx: { create },
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
  },
} = require('./dependencies');

/**
 * @description Create an `IObservable` that asynchronously emits values.
 */
function zip(value, callback) {
  var observable = this;

  return create(observer => {
    var iterator;
    var dispose;

    return dispose = observable[Subscribe](
      o => {
        if (!iterator)
          iterator = getGenerator(value)();

        var current = iterator.next();
        if (current.done) {
          observer[Complete]();
          dispose();
          return;
        }

        observer[Next](callback(o, current.value))
      },
      () => observer[Complete](),
      o => observer[Error]()
    );
  });
}

exportExtension(module, IObservable, zip);
