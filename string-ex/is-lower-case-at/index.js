var { 
  ['@kingjs']: { 
    module: { ExportExtension }
  }
} = require('./dependencies');

/**
 * @description Test if a character at an index in a string is lower case.
 * 
 * @this String The string.
 * @param index The zero based index at which to test casing.
 * 
 * @return Returns true if the character at `index` is lower case.
 */
function isLowerCaseAt(index) {
  if (index < 0 || index >= this.length)
    return false;

  return this.charAt(index).toLowerCase() == this[index];
}

module[ExportExtension](String, isLowerCaseAt)