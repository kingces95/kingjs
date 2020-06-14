var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-interface': { ExportExtension },
    '-rx-observer': { Check }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asynchronously return the next emission.
 * @this any The source `IObservable` whose emission resolves the promise.
 * @returns Returns a promise that that resolves with the value of
 * the next `next` emission or `undefined` if `complete` and rejects on `error`.
 * 
 * @remarks The subscription used by the promise to resolve upon
 * a `next` emission also schedules a disposal of the subscription.
 */
function first() {
  return new Promise((resolve, reject) => {
    var cancel = this[Subscribe]({
        [Next](o) {
          resolve(o)
          cancel()
        }, 
        [Complete]: resolve,
        [Error]: reject
      }
    )
  })
}

module[ExportExtension](IObservable, first)