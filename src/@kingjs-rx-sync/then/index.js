var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Complete },
    '-rx': {
      '-observer': { Proxy, Check },
      '-sync-static': { create, empty }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an `IObservable` that emits values
 * from the source `IObservable` followed by the values of
 * another `IObservable`.
 * 
 * @this any The source `IObservable`.
 * 
 * @param next The `IObservable` to emit after the source 
 * `IObservable` completes.
 * 
 * @returns Returns a new `IObservable` that emits the values
 * of two `IObservable`s, one after the other.
 */
function then(next = empty()) {
  return create(observer => {
    var nextCancel

    var cancel = this[Subscribe](
      observer[Proxy]({
        [Complete]() {
          nextCancel = next[Subscribe](this)
        }
      })[Check]()
    )

    return () => nextCancel ? nextCancel() : cancel()
  })
}

module[ExportExtension](IObservable, then)
