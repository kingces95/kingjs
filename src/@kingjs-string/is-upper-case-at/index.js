var { 
  '@kingjs': { 
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Test if a character at an index in a string is upper case.
 * 
 * @this String The string.
 * @param index The zero based index at which to test casing.
 * 
 * @return Returns true if the character at `index` is upper case.
 */
function isUpperCaseAt(index) {
  if (index < 0 || index >= this.length)
    return false;

  return this.charAt(index).toUpperCase() == this[index];
}

module[ExportExtension](String, isUpperCaseAt)