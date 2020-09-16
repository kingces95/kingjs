var { 
  '@kingjs': {
    IObservable,
    IObserver: { Next, Complete, Error },
    '-rx-sync': { Do },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an `IObservable` that logs next and error events.
 * @this any The source `IObservable` whose events are logged.
 * @returns Returns a new `IObservable` that behaves like the source `IObservable`.
 */
function log() {
  return this[Do]({
    [Next](o) { console.log(o) },
    [Complete]() { },
    [Error](e) { console.error(e) }
  })
}

module[ExportInterfaceExtension](IObservable, log)
