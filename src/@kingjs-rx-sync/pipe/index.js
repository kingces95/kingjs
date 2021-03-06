var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Subscribes `subject` to the source `IObservable` and returns
 * the `subject` (instead of a dispose function).
 * @this any The `IObservable` to which `subject` will be subscribed.
 * @param subject The subject to be subscribed to the source `IObservables`.
 * @returns Returns `subject`.
 */
function pipe(subject) {
  this[Subscribe](subject)
  return subject
}

module[ExportInterfaceExtension](IObservable, pipe)
