var { 
  '@kingjs': {
    IEnumerable,
    '-module': { ExportInterfaceExtension },
    '-linq-reduction': { Aggregate },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Computes the sum of a sequence of 
 * numbers projected from elements of a sequence.
 */
function sum() {
  return this[Aggregate](0, function(a, x) { 
    return a + x 
  })
}

module[ExportInterfaceExtension](IEnumerable, sum)
