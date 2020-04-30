var { 
  ['@kingjs']: {
    module: { 
      ExportExtension
    },
  }
} = require('./dependencies');

/**
 * @description Returns the last element of an array.
 * 
 * @this any The array.
 * 
 * @returns Returns the last element of the array.
 */
function peek() {
  return this[this.length - 1]
}

module[ExportExtension](Array, peek)
