var { 
  '@kingjs-module': { ExportExtension }
} = module[require('@kingjs-module/dependencies')]()

var set = new Set()

/**
 * @description Removes duplicate array elements.
 * 
 * @returns Returns a copy of the array with duplicate elements removed.
 */
function distinct() {
  for (var i = 0; i < this.length; i++)
    set.add(this[i])
  
  var result = []
  set.forEach(o => result.push(o))
  set.clear()

  return result
}

module[ExportExtension](Array, distinct)