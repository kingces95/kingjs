var { 
  '@kingjs': {
    IObservable,
    IObserver: { Complete, Error },
    '-rx-sync': { Do },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Spies on the `complete` and `error` events.
 * @this any The source `IObservable` whose `complete` and `error` events are spied upon.
 * @param callback The callback to make when `complete` or `error` event occurs.
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable` modulo any side effects introduced by `callback`.
 */
function finalize(callback) {
  return this[Do]({
    [Complete]: callback, 
    [Error]: callback
  })
}

module[ExportExtension](IObservable, finalize)