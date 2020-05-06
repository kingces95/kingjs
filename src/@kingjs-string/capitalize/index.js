var { 
  '@kingjs': { 
    '-module': { ExportExtension },
    '-string': { IsCapitalized }
  }
} = module[require('@kingjs-module/dependencies')]()

var { name, version } = require('./package.json')

/**
 * @description Capitalize a string.
 * 
 * @this String The string.
 * 
 * @return Returns a capitalized version of the string.
 */
function capitalize() {
  if (this[IsCapitalized]())
    return this

  return this.charAt(0).toUpperCase() + this.substring(1, this.length)
}

module[ExportExtension](String, capitalize)