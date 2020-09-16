var { 
  '@kingjs': {
    EmptyObject,
    '-string': { Capitalize, Decapitalize },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Turn an array of named flags into a pojo of boolean properties.
 * @this Array An array of strings.
 * @returns Returns a pojo whose property names are listed in the array and whose
 * values are all `true`.
 */
function toFlags(options = EmptyObject) {
  var { capitalize, decapitalize } = options

  var pojo = { }
  for (var i = 0; i < this.length; i++) {
    var key = this[i]

    if (capitalize)
      key = key[Capitalize]()

    if (decapitalize)
      key = key[Decapitalize]()

    pojo[key] = true
  }
  return pojo
}

module[ExportExtension](Array, toFlags)