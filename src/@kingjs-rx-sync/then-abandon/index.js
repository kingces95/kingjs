var { 
  '@kingjs': {
    IObservable,
    '-rx': {
      '-sync': { Then, 
        '-static': { never }
      }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Trap for `complete` and swallow it emitting nothing further.
 * @this any The source `IObservable`.
 * @returns Returns a new `IObservable` that emits nothing further
 * after observing `complete`.
 */
function thenAbandon() {  
  return this
    [Then](never())
}

module[ExportInterfaceExtension](IObservable, thenAbandon)
