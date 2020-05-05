var { 
  ['@kingjs']: {
    rx: { 
      create,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
    },
    reflect: { 
      exportExtension
    },
  }
} = module[require('@kingjs-module/dependencies')]();

// https://jsblog.insiderattack.net/promises-next-ticks-and-immediates-nodejs-event-loop-part-3-9226cbe7a6aa

/**
 * @description Returns an `IObservable` that maps values emitted
 * from the current `IObservable`.
 * 
 * @this any The source `IObservable` whose emitted value are mapped.
 * 
 * @param callback The function that maps each emitted value.
 * @param [scheduler] The `IScheduler` to used to schedule `next` emissions.
 * 
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function select(callback) {
  var observable = this;

  return create(observer => {
    return observable[Subscribe](
      o => observer[Next](callback(o)),
      o => observer[Complete](),
      o => observer[Error](o)
    );
  })
}

exportExtension(module, IObservable, select);
