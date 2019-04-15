var { 
  ['@kingjs']: {
    rx: { 
      create,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { exportExtension },
    stringEx: { Expand }
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
function log(
  label, 
  format) {

  var observable = this;

  function log(label, msg) {
    if (format)
      msg = format[Expand](msg);
    console.log(label, msg);
  }

  return create(observer => {
    return observable[Subscribe](
      o => {
        log(label, o)
        observer[Next](o)
      },
      () => {
        log(`${label} COMPLETE`)
        observer[Complete]()
      },
      o => {
        log(`${label} ERROR`, o)
        observer[Error](o)
      }
    );
  })
}

exportExtension(module, IObservable, log);
