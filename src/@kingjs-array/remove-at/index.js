var { 
  '@kingjs-module': {
    ExportExtension
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Removes an array element at a specific index.
 * 
 * @this any The array from which an element is to be removed.
 * @param index THe index to remove from the array.
 * 
 * @returns Returns the element removed.
 */
function removeAt(index) {
  var result = this[index]
  this.splice(index, 1)
  return result
}

module[ExportExtension](Array, removeAt)
