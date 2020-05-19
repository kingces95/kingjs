var { 
  deepEquals,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx-sync-static': { create },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultKeySelector = o => o

/**
 * @description Emit values that are different than that last emitted value.
 * 
 * @param [keySelector] A callback to select the key used to 
 * determine equality between two emitted values.
 * @param [equal] An call back which determines if two keys
 * are equal.
 * 
 * @returns Returns an `IObservable` whose each value is
 * distinct from the previously emitted value.
 */
function distinctUntilChanged(keySelector = DefaultKeySelector) {
  return create(observer => {
    var hasLastKey
    var lastKey

    return this[Subscribe]({
      ...observer,
      [Next](o) {
        var key = keySelector(o)

        if (hasLastKey && deepEquals(lastKey, key))
          return
        
        observer[Next](o)
        lastKey = key
        hasLastKey = true
      },
    })
  })
}

module[ExportExtension](IObservable, distinctUntilChanged)
