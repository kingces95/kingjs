var { 
  '@kingjs': {
    '-linq-reduction': { Aggregate },
    '-interface': { ExportExtension },
    IEnumerable,
    Dictionary,
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Creates a dictionary from a sequence where the 
 * dictionary keys and values are projected from each element.
 * 
 * @param {*} keySelector 
 * @param {*} valueSelector 
 */
function toDictionary(keySelector, valueSelector) {      
  return this[Aggregate](new Dictionary(), function(dictionary, o) { 
    var key = keySelector(o)
    if (key in dictionary)
      throw "toDictionary: key already exists: " + key
    
    var value = o
    if (valueSelector)
      value = valueSelector(o)
    
    dictionary[key] = value
    return dictionary
  })
}

module[ExportExtension](IEnumerable, toDictionary)
