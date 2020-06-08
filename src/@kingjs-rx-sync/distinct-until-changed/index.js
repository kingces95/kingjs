var { 
  deepEquals,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': {
      '-observer': { Proxy },
      '-sync-static': { create }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultKeySelector = o => o

/**
 * @description Emit values that are different than that last emitted value.
 * 
 * @param [keySelector] A callback to select the key used to 
 * determine equality between two emitted values.
 * @param [equals] An call back which determines if two keys
 * are equal.
 * 
 * @returns Returns an `IObservable` whose each value is
 * distinct from the previously emitted value.
 */
function distinctUntilChanged(
  keySelector = DefaultKeySelector,
  equals = deepEquals) {

  return create(observer => {
    var hasLastKey
    var lastKey

    return this[Subscribe](
      observer[Proxy]({
        [Next](o) {
          var key = keySelector(o)

          if (hasLastKey && equals(lastKey, key))
            return
          
          this[Next](o)
          lastKey = key
          hasLastKey = true
        },
      })
    )
  })
}

module[ExportExtension](IObservable, distinctUntilChanged)
