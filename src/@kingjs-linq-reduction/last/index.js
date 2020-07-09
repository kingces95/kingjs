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
 * @description Returns the last element of a sequence that 
 * satisfies a specified condition.
 * 
 * @param {*} predicate 
 */
function last(predicate) {
  var enumerable = this
      
  if (predicate)
    enumerable = enumerable[Where](predicate)
  
  var enumerator = enumerable[GetEnumerator]()  
  
  if (!enumerator[MoveNext]())
    throw 'last: Sequence contains no matching elements.'

  var current = enumerator[Current]
  while (enumerator[MoveNext]())
    current = enumerator[Current]
  
  return current
}

module[ExportInterfaceExtension](IEnumerable, last)
