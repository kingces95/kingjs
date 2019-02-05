var { 
  ['@kingjs']: { 
    defineExtension,
    stringEx: { isCapitalized: IsCapitalized }
  }
} = require('./dependencies');

var { name, version } = require('./package.json');

/**
 * @description Capitalize a string.
 * 
 * @this String The string.
 * 
 * @return Returns a capitalized version of the string.
 */
function capitalize() {
  if (this[IsCapitalized]())
    return this;

  return this.charAt(0).toUpperCase() + this.substring(1, this.length);
}

module.exports = defineExtension(
  String.prototype, name, version, capitalize
);