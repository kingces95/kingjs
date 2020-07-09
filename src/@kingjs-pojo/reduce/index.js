var { 
  '@kingjs-module': {
    ExportExtension
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Reduces the key/value pairs of a pojo. 
 * 
 * @this any The object whose properties will be reduced.
 * @param callback The reduction callback.
 * @param [options] A pojo of the form `{ initialValue = { }, 
 * nonEnumerable = false, enumerable = true }`.
 * @returns Returns the reduction of the pojo.
 * 
 * @callback
 * @param accumulator The accumulated value.
 * @param key The key of the property being reduced.
 * @param value The value of the property being reduced.
 * @param pojo The pojo being reduced.
 * @returns The accumulated value.
 * 
 * @remarks If the callback returns `undefined` the previous
 * accumulator value will be passed to the next reduction.
 */
function reduce(callback, options = { }) {
  var { 
    initialValue: accumulator = { }, 
    nonEnumerable = false,
    enumerable = true,
    valueFilter = o => true,
  } = options

  var keys = []
  if (nonEnumerable)
    keys.push(...Object.getOwnPropertyNames(this))
  if (enumerable)
    keys.push(...Object.keys(this))

  for (var key of keys) {
    var previousAccumulator = accumulator
    var value = this[key]
    if (!valueFilter(value))
      continue

    accumulator = callback(accumulator, key, value, this) 
    if (accumulator === undefined)
      accumulator = previousAccumulator
  }

  return accumulator
}

module[ExportExtension](Object, reduce)