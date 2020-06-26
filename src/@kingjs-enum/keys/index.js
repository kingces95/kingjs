var { assert,
  '@kingjs': {
    '-reflect': { is },
    '-interface': { Interface },
    '-module': { ExportStaticExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Return the members of the interface.
 * @this The interface. 
 * @returns Returns an array of the members
 * of the interface.
 */
function keys() {
  return Object.getOwnPropertyNames(this)
    .filter(o => is.array(this[o]) || is.symbol(this[o]))
}

module[ExportStaticExtension](Interface, keys)