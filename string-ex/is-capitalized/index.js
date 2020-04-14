var { 
  ['@kingjs']: { 
    module: { ExportExtension },
    stringEx: { isUpperCaseAt: IsUpperCaseAt }
  }
} = require('./dependencies');

/**
 * @description Test if a string is capitalized.
 * 
 * @this String The string.
 * 
 * @return Returns true if the first character is upper case.
 */
function isCapitalized() {
  return this[IsUpperCaseAt](0);
}

module[ExportExtension](String, isCapitalized)