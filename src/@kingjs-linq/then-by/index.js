var { 
  '@kingjs': {
    IEnumerable,
    IOrderedEnumerable: { CreateOrderedEnumerable },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates a sequence of elements from a sorted 
 * sequence where elements previously considered equal are 
 * put in ascending order according to a key.
 * 
 * @param {*} keySelector 
 * @param {*} lessThan 
 */
function thenBy(keySelector, lessThan) {
  return this[CreateOrderedEnumerable](keySelector, lessThan, false)
}

module[ExportExtension](IEnumerable, thenBy)
