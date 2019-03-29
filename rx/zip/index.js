var {
  ['@kingjs']: {
    getIterator,
    rx: { create },
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
          iterator = getIterator(value);

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

module.exports = zip;