var { 
  ['@kingjs']: {
    rx: { create },
    reflect: { 
      is,
      exportExtension
    },
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error }
  }
} = require('./dependencies');

/**
 * @description Returns an `IObservable` that logs life-cycle events.
 * 
 * @this any The source `IObservable` whose live-cycle events are logged.
 * 
 * @param label A label identifying the log.
 * @param [format] Optional format string to display emitted values.
 * 
 * @returns Returns a new `IObservable` that behaves like the source `IObservable`.
 */
function log(label, format) {
  var observable = this;

  return create(observer => {
    return observable[Subscribe](
      o => {
        console.log(label, o)
        observer[Next](o)
      },
      () => {
        console.log(label, 'COMPLETE')
        observer[Complete]()
      },
      o => {
        console.log(label, o)
        observer[Error](o)
      }
    );
  })
}

exportExtension(module, IObservable, log);
