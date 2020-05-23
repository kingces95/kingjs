var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-linq-static': { defaultEqual },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns true if two sequences contain the same 
 * number of elements and those that share the same index are equal.
 * 
 * @param {*} other 
 * @param {*} equals 
 */
function sequenceEqual(other, equals) {
  if (equals === undefined)
    equals = defaultEqual
  
  var lhs = this[GetEnumerator]()  
  var rhs = other[GetEnumerator]()  
  
  while (lhs[MoveNext]()) {
    if (rhs[MoveNext]() == false)
      return false
    
    var lhsValue = lhs[Current]
    var rhsValue = rhs[Current]
    
    if (!equals(lhsValue, rhsValue))
      return false
  }
  
  return rhs[MoveNext]() == false
}

module[ExportExtension](IEnumerable, sequenceEqual)