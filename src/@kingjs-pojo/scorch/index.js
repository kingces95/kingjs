var { 
  '@kingjs': {
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Deletes any property with an undefined values.
 * 
 * @this any The object whose properties are scorched.
 * @returns Returns the object with no property having an undefined value.
 */
function scorch() {
  for (var key in this) {
    if (this[key] !== undefined)
      continue
    delete this[key]
  }

  return this
}

module[ExportExtension](Object, scorch)