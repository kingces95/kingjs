var { assert,
  '@kingjs': { 
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var map = new Map()

/**
 * @description Return a string object for a string.
 * @this String The string to intern.
 * @return Returns a string object.
 * 
 * @remarks The same string object will be returned for a given string.
 * @remarks The string object is never collected.
 */
function intern() {
  var key = this.toString()
  var result = map.get(key)
  if (!result)
    map.set(key, result = this)
  return result
}

module[ExportExtension](String, intern)