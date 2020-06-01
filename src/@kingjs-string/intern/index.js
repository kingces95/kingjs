var { assert,
  '@kingjs': { 
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var InternStringMap = Symbol.for('@kingjs-string, intern')

if (!global[InternStringMap])
  global[InternStringMap] = new Map()

/**
 * @description Intern strings.
 * @this String The string to intern.
 * @return Returns an interned string object.
 */
function intern() {
  var map = global[InternStringMap]

  var key = this.toString()
  var result = map.get(key)
  if (!result)
    map.set(key, result = Object.freeze(new String(key)))
  return result
}

module[ExportExtension](String, intern)