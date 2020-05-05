var { 
  assert,
  '@kingjs-module': {
    ExportExtension
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Reduces the key/value pairs of a pojo. 
 * 
 * @this any The object whose properties will be reduced.
 * @param callback The reduction callback.
 * @param [initialValue] The initial value of the accumulation.
 * 
 * @callback
 * @param accumulator The accumulated value.
 * @param key The key of the property being reduced.
 * @param value The value of the property being reduced.
 * @param pojo The pojo being reduced.
 * @returns The accumulated value.
 * 
 * @returns Returns the reduction of the pojo.
 * 
 * @remarks If the callback returns `undefined` the previous
 * accumulator value will be passed to the next reduction.
 */
function reduce(callback, initialValue = { }) {
  var accumulator = initialValue

  for (var key in this) {
    var previousAccumulator = accumulator
    accumulator = callback(accumulator, key, this[key], this) 
    if (accumulator === undefined)
      accumulator = previousAccumulator
  }

  return accumulator
}

module[ExportExtension](Object, reduce)