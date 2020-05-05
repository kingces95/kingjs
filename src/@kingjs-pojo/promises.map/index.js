var { 
  '@kingjs-module': { 
    ExportExtension
  },
  '@kingjs': {
    run
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Maps each promise of a pojo in parallel.
 * 
 * @this any The pojo whose promises are mapped.
 * @param callback The asynchronous mapping function.
 * 
 * @callback
 * @param value The value of the promise to map.
 * @param key The key of the value.
 * @returns The mapped value.
 * 
 * @returns Returns a promise that resolves to a new pojo
 * with mapped values.
 */
async function map(callback = o => o) {
  var pojo = this
  var result = { }

  await run(async function*() {
    for (var key in pojo) {
      yield (async function*(k) {
        result[k] = callback(await pojo[k], k)
      })(key)
    }
  })

  return result;
}

module[ExportExtension](Object, map)