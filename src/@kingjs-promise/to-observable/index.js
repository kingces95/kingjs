var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-module': { ExportExtension },
    '-rx': { create }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Turns a promise into an IObservable
 * that emits the resolved value followed by `complete`
 * or `error` if the promise throws.
 * 
 * @this any The promise.
 * 
 * @returns Returns an `IObservable`.
 */
function toObservable() {
  return create(subject => {
    var canceled

    this.then(
      o => {
        if (canceled)
          return
        subject[Next](o)
        
        if (canceled)
          return
        subject[Complete]()
      },
      o => {
        if (canceled)
          return
        subject[Error](o)
      }
    )

    return () => canceled = true
  })
}

module[ExportExtension](Promise, toObservable)