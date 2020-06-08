var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-rx': {
      '-observer': { Proxy },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Counts the number of next events.
 * @this any `this` The original observer.
 * @returns Returns an `IObservable` that counts the number of
 * emissions from the original observer and when the original
 * subscription completes, emits the count. 
 */
function count() {
  return create(observer => {
    var i = 0
    return this[Subscribe](
      observer[Proxy]({
        [Next]() { i++ },
        [Complete]() { 
          this[Next](i)
          this[Complete]()
        }
      }),
    )
  })
}

module[ExportExtension](IObservable, count)