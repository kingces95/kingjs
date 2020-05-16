var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },
    '-linq': { Where },
  }
} = module[require('@kingjs-module/dependencies')]()

function throwNoSingleMatch() {
  throw "single: sequence does not contain a single elements matching predicate."
}

/**
 * @description Returns the only element of a sequence 
 * that satisfies a specified condition.
 * 
 * @param {*} predicate 
 */
function single(predicate) {
  var enumerable = this
  
  if (predicate)
    enumerable = enumerable[Where](predicate)
  
  var enumerator = enumerable[GetEnumerator]()
  
  if (!enumerator[MoveNext]())
    throwNoSingleMatch()
  
  var result = enumerator[Current]
  
  if (enumerator[MoveNext]())
    throwNoSingleMatch()
  
  return result
}

module[ExportExtension](IEnumerable, single)
