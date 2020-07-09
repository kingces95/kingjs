var { 
  '@kingjs': {
    IEnumerable,
    IOrderedEnumerable: { CreateOrderedEnumerable },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates a sequence of elements from a sorted 
 * sequence where elements previously considered equal are put 
 * in descending order according to a key.
 * 
 * @param {*} keySelector 
 * @param {*} lessThan 
 */
function thenByDescending(keySelector, lessThan) {
  return this[CreateOrderedEnumerable](keySelector, lessThan, true)
}

module[ExportInterfaceExtension](IEnumerable, thenByDescending)
