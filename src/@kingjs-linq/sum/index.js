var { 
  '@kingjs': {
    IEnumerable,
    '-interface': { ExportExtension },
    '-linq': { Aggregate },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Computes the sum of a sequence of 
 * numbers projected from elements of a sequence.
 */
function sum() {
  return this[Aggregate](0, function(x) { 
    return this + x 
  })
}

module[ExportExtension](IEnumerable, sum)
