var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asynchronously return an array of emissions.
 * @this any The source `IObservable` whose emission are captured.
 * @returns Returns a promise that that resolves with the value of
 * the `next` emissions before `complete` and rejects on `error`.
 */
function all() {
  return new Promise((resolve, reject) => {
    var result = []
    this[Subscribe]({
      [Next](o) { result.push(o) }, 
      [Complete]() { resolve(result) }, 
      [Error](e) { reject(e) }
    })
  })
}

module[ExportExtension](IObservable, all)
