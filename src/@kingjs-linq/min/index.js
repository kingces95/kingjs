var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },
    '-linq': { defaultLessThan },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns the minimum value in a sequence of values 
 * projected from elements of a sequence.
 * 
 * @param {*} lessThan 
 */
function min(lessThan) {
  if (!lessThan)
    lessThan = defaultLessThan
  
  var result = undefined
  var enumerator = this[GetEnumerator]()
  if (enumerator[MoveNext]()) {
    result = enumerator[Current]
    
    while (enumerator[MoveNext]()) {
      if (lessThan(enumerator[Current], result) == true)
        result = enumerator[Current]
    }
  }

  return result
}

module[ExportExtension](IEnumerable, min)
