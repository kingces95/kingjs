var { assert,
  deepEquals,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    IEquatable,
    IEquatable: { Equals },
    '-rx': {
      '-observer': { Proxy },
      '-sync-static': { create }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o
var Options = { name: distinctUntilChanged.name }

/**
 * @description Emit values that are different than that last emitted value.
 * 
 * @param [keySelector] A callback to select the key used to 
 * determine equality between two emitted values.
 * 
 * @returns Returns an `IObservable` whose each value is
 * distinct from the previously emitted value.
 */
function distinctUntilChanged(keySelector = Identity) {

  return create(observer => {
    var hasLastKey
    var lastKey

    return this[Subscribe](
      observer[Proxy]({
        [Next](o) {
          var key = keySelector(o)
          assert.ok(key instanceof IEquatable)

          if (hasLastKey && lastKey[Equals](key))
            return
          
          this[Next](o)
          lastKey = key
          hasLastKey = true
        },
      })
    )
  }, Options)
}

module[ExportInterfaceExtension](IObservable, distinctUntilChanged)
