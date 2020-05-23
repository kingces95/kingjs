var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },
    '-linq': { Where },
  }
} = module[require('@kingjs-module/dependencies')]()


/**
 * @description Returns the last element of a sequence 
 * that satisfies a specified condition or a undefined.
 * 
 * @param {*} predicate 
 */
function lastOrUndefined(predicate) {
  var enumerable = this
      
  if (predicate)
  enumerable = enumerable[Where](predicate)
  
  var enumerator = enumerable[GetEnumerator]()  
  
  var current
  while (enumerator[MoveNext]())
    current = enumerator[Current]
  
  return current
}

module[ExportExtension](IEnumerable, lastOrUndefined)
