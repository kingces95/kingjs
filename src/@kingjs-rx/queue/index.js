var { 
  ['@kingjs']: {
    TaskPool,
    array: { Remove },
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
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Returns an `IObservable` that asynchronously maps 
 * values emitted from the current `IObservable`.
 * 
 * @this any The source `IObservable` whose emitted value are mapped.
 * 
 * @param callback An async function that maps each emitted value.
 * 
 * @returns Returns a new `IObservable` that emits mapped values.
 * 
 * @remarks - `error` and `complete` events are delivered after all `next` events have been drained.
 * @remarks - Selection tasks are serialized. 
 * @remarks - One pending selection task is queued.
 * @remarks - The pending selection task is replaced by more recent observations.
 */
function queue(callback) {
  var observable = this;

  return create(function(observer) {
    var pool = new TaskPool();
    var count = 0;
    var resolve;

    return observable[Subscribe](
      o => {
        count++;
        pool.start(async () => {
          observer[Next](await callback(o));
          count--

          if (!count && resolve)
            resolve();
        })
      },
      () => {
        resolve = () => observer[Complete]();
        if (!count)
          resolve();
      },
      o => {
        resolve = () => observer[Error](o);
        if (!count)
          resolve();
      }
    );
  });
}

exportExtension(module, IObservable, queue);
