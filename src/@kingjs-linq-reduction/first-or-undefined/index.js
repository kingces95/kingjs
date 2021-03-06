var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-module': { ExportInterfaceExtension },
    '-linq': { Where },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns the first element of a sequence 
 * that satisfies a specified condition or a undefined.
 * 
 * @param {*} predicate 
 */
function firstOrUndefined(predicate) {
  var enumerable = this
  
  if (predicate)
    enumerable = enumerable[Where](predicate)
  
  var enumerator = enumerable[GetEnumerator]()
  
  if (!enumerator[MoveNext]())
    return undefined
  
  return enumerator[Current]
}

module[ExportInterfaceExtension](IEnumerable, firstOrUndefined)
