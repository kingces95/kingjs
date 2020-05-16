var { 
  '@kingjs': {
    IEnumerable,
    '-interface': { ExportExtension },
    '-linq': { Aggregate },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns the number of elements in a 
 * sequence that satisfy a condition.
 */
function count(predicate) {      
  return this[Aggregate](0, function(x) {
    var aggregate = this

    if (!predicate || predicate(x))
      aggregate++
    
    return aggregate 
  })
}

module[ExportExtension](IEnumerable, count)