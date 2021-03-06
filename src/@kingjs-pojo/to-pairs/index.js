var { 
  '@kingjs-pojo': {
    Reduce
  },
  '@kingjs-module': {
    ExportExtension
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an array of objects with key and value properties
 * for the name and value of each property of the source object.
 * 
 * @this any The object whose properties are returned as an array of pairs
 * 
 * @returns Returns an array of `{ key, value }`.
 */
function toPairs() {
  return this[Reduce](
    (a, key, value) => { 
      a.push({ key, value }) 
    }, {
      initialValue: []
    })
}

module[ExportExtension](Object, toPairs)