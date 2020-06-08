var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Initialize, Complete },
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

    var cancelThunk
    var cancel = () => cancelThunk()

    this[Subscribe](
      observer[Proxy]({
        [Initialize](o) { 

          // cancel original IObservable
          cancelThunk = o 
          this[Initialize](cancel)
        },
        [Complete]() {
          next[Subscribe](
            observer[Proxy]({
              [Initialize](o) { 

                // cancel subsequent IObservable
                cancelThunk = o
              }
            })
          )
        }
      })
    )

    return cancel
  })
}

module[ExportExtension](IObservable, then)
