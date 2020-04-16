var { 
  ['@kingjs']: {
    array: { RemoveAt },
    module: { 
      ExportExtension
    },
  }
} = require('./dependencies');

/**
 * @description Removes an element from an array and
 * shifts the other elements down.
 * 
 * @this any The array from which an element is to be removed.
 * @param index THe index to remove from the array.
 * 
 * @returns Returns the array with an element removed and the
 * remaining elements shifted down.
 */
function remove(element) {
  this[RemoveAt](this.indexOf(element));
  return this;
}

module[ExportExtension](Array, remove);
