var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-rx-static': { create },
    '-module': { ExportInterfaceExtension },    
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns a cold IObservable of an IEnumerable published
 * at a specified `interval` until exhausted.
 * 
 * @this any `this` The enumerable from which elements are pulled.
 * 
 * @returns Returns a cold IObservable.
 */
function toObservable() {
  var enumerable = this

  return create(function(next) {
    var enumerator = this.enumerator

    if (!enumerator)
      enumerator = this.enumerator = enumerable[GetEnumerator]()

    if (!enumerator[MoveNext]())
      return false

    next(enumerator[Current])
    return true
  })
}

module[ExportInterfaceExtension](IEnumerable, toObservable)
