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
 * that satisfies a specified condition.
 * 
 * @param {*} predicate 
 */
function first(predicate) {
  var enumerable = this
  
  if (predicate)
    enumerable = enumerable[Where](predicate)
  
  var enumerator = enumerable[GetEnumerator]()
  
  if (!enumerator[MoveNext]())
    throw 'first: Sequence contains no matching elements.'
  
  return enumerator[Current]
}

module[ExportInterfaceExtension](IEnumerable, first)
