var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    '-rx-sync': { Log },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an `IObservable` that logs next and error events.
 * @this any The source `IObservable` whose events are logged.
 * @returns Returns a new `IObservable` that behaves like the source `IObservable`.
 */
function subscribeAndLog() {
  return this
    [Log]()
    [Subscribe]()
}

module[ExportInterfaceExtension](IObservable, subscribeAndLog)
