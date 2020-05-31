var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': { 
      '-observer': { Proxy, Check },
      '-sync-static': { create }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultKeySelector = o => o

/**
 * @description Skips values previously emitted.
 * 
 * @param [keySelector] A callback to select the key used to 
 * determine equality between two emitted values.
 * 
 * @returns Returns an `IObservable` of distinct values.
 */
function distinct(keySelector = DefaultKeySelector) {
  return create(observer => {
    var keys
    return this[Subscribe](
      observer[Proxy]({
        [Next](o) {
          var key = keySelector(o)

          if (!keys)
            keys = new Set()

          if (keys.has(key))
            return
          
          this[Next](o)
          keys.add(key)
        },
      })[Check]()
    )
  })
}

module[ExportExtension](IObservable, distinct)
