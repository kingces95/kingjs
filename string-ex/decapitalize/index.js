var { 
  ['@kingjs']: { 
    defineExtension,
    stringEx: { isCapitalized: IsCapitalized }
  }
} = require('./dependencies');

var { name, version } = require('./package.json');

/**
 * @description Decapitalize a string.
 * 
 * @this String The string.
 * 
 * @return Returns a decapitalized version of the string.
 */
function decapitalize() {
  if (!this[IsCapitalized]())
    return this;

  return this.charAt(0).toLowerCase() + this.substring(1, this.length);
}

module.exports = defineExtension(
  String.prototype, name, version, decapitalize
);