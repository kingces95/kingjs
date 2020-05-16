var { 
  '@kingjs': {
    Dictionary,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Creates a dictionary from a sequence 
 * where values are groups of elements keyed by a 
 * name common to all members of the group.
 * 
 * @param {*} keySelector 
 * @param {*} valueSelector 
 */
function toLookup(keySelector, valueSelector) {       
  var lookup = new Dictionary()
  
  var enumerator = this[GetEnumerator]()  
  while (enumerator[MoveNext]()) {
    var current = enumerator[Current]
    
    var value = current
    if (valueSelector)
      value = valueSelector(current)
    
    var key = keySelector(current)
    var values = lookup[key]
    if (!values) {
      var values = []
      lookup[key] = values
      values.key = key
    }
    
    values.push(value)
  }
  
  return lookup
}

module[ExportExtension](IEnumerable, toLookup)
