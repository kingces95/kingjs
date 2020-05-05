var { 
  '@kingjs-module': { 
    ExportExtension,
  },
  '@kingjs-string': {
    isCapitalized: IsCapitalized
  }
} = require('./dependencies');

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

module[ExportExtension](String, decapitalize)