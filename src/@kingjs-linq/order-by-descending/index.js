var { 
  '@kingjs': {
    IEnumerable,
    '-module': { ExportInterfaceExtension },
    '-linq': { OrderBy },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates a sequence of elements in 
 * ascending order according to a key.
 * 
 * @param {*} keySelector 
 * @param {*} lessThan 
 */
function orderByDescending(keySelector, lessThan) {
  return this[OrderBy](keySelector, lessThan, true)
}

module[ExportInterfaceExtension](IEnumerable, orderByDescending)
