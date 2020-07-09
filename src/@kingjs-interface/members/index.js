var { assert,
  '@kingjs': {
    '-reflect': { is },
    '-interface': { Interface },
    '-module': { ExportStaticExtension },
    '-string': { Decapitalize }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Return the members of the interface.
 * @this any The interface. 
 * @returns Returns the names of the members of the interface
 * as an array of strings.
 * 
 * @remarks The names returned are not capitalized.
 */
function members() {
  return Object.getOwnPropertyNames(this)
    .filter(o => is.array(this[o]) || is.symbol(this[o]))
    .map(o => o[Decapitalize]())
}

module[ExportStaticExtension](Interface, members)