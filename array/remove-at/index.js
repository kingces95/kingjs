var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
  }
} = require('./dependencies');

/**
 * @description Removes an array element at a specific index.
 * 
 * @this any The array from which an element is to be removed.
 * @param index THe index to remove from the array.
 * 
 * @returns Returns the array with an element removed and the
 * remaining elements shifted down.
 */
function removeAt(index) {
  this.splice(index, 1);
  return this;
}

exportExtension(module, Array, removeAt);
