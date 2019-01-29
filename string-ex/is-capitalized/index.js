var { 
  ['@kingjs']: { 
    defineExtension,
    stringEx: { isUpperCaseAt: IsUpperCaseAt }
  }
} = require('./dependencies');

var { name, version } = require('./package.json');

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

module.exports = defineExtension(
  String.prototype, name, version, isCapitalized
);