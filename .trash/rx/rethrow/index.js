var { 
  '@kingjs': {
    IObservable,
    '-rx': { Spy },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an `IObservable` that spies on the `error` event.
 * 
 * @this any The source `IObservable` whose `error` event is spied upon.
 * 
 * @param callback The callback to make when `error` event occurs.
 * 
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable` modulo any side effects introduced by `callback`.
 */
function rethrow(callback) {
  return this[Spy](null, null, callback)
}

ExportExtension(module, IObservable, rethrow)
