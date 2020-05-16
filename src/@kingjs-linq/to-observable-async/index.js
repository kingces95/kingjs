var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },    
    '-rx': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns a cold IObservable of an IEnumerable published
 * at a specified `interval` until exhausted.
 * 
 * @this any `this` The enumerable from which elements are pulled.
 * 
 * @param foo `interval` The period at which to pull elements from
 * the enumerable and publish them to the observers.
 * 
 * @returns Returns a cold IObservable.
 */
function toObservable(interval) {
  var enumerable = this

  return create(function(observer) {
    try {
      var enumerator = enumerable[GetEnumerator]()
      while (enumerator[MoveNext]())
        observer[Next](enumerator[Current])
      observer[Complete]()
    } catch(e) { 
      observer[Error](e)
    }
  })

  return createAsync(interval, function(next) {
    var enumerator = this.enumerator

    if (!enumerator)
      enumerator = this.enumerator = enumerable[GetEnumerator]()

    if (!enumerator[MoveNext]())
      return false

    next(enumerator[Current])
    return true
  })
}

module[ExportExtension](IEnumerable, toObservable)
