var { 
  '@kingjs': {
    IObservable,
    '-rx': {
      '-sync': { CatchAndThen, 
        '-static': { never }
      }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Trap for `error` and swallow it emitting nothing further.
 * @this any The source `IObservable`.
 * @returns Returns a new `IObservable` that emits nothing further
 * after observing `complete`.
 */
function catchAndAbandon() {  
  return this
    [CatchAndThen](never())
}

module[ExportInterfaceExtension](IObservable, catchAndAbandon)
