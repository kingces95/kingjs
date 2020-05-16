var { 
  '@kingjs': {
    IEnumerable,
    '-interface': { ExportExtension },
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

module[ExportExtension](IEnumerable, orderByDescending)
