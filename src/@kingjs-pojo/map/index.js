var { 
  '@kingjs-pojo': { 
    Reduce
  },
  '@kingjs-module': {
    ExportExtension,
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Maps each value of a pojo.
 * 
 * @this any The pojo whose values are mapped.
 * @param callback The mapping function.
 * 
 * @callback
 * @param value The value to map.
 * @param key The key of the value.
 * @returns The mapped value.
 * 
 * @returns Returns a new pojo with mapped values.
 */
function map(callback = o => o) {
  return this[Reduce]((a, k, v) => { a[k] = callback(v, k) }, { })
}

module[ExportExtension](Object, map)