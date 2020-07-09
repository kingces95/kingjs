var { 
  '@kingjs': {
    IEnumerable,
    '-module': { ExportInterfaceExtension },
    '-linq': { Except },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates a sequence composed of the 
 * distinct elements of another sequence.
 * 
 * @param {*} selectId 
 */
function distinct(selectId) {
  return this[Except](undefined, selectId)
}

module[ExportInterfaceExtension](IEnumerable, distinct)
