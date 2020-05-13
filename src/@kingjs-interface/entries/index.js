var { 
  '@kingjs': {
    '-interface': { Interface, Keys },
    '-module': { ExportStaticExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Return the symbols associated with each
 * member of the interface.
 * @this The interface.
 * @returns Return an array of { key, symbols } pojo, where
 * key is the member name and symbols is an array of symbols
 * associated with the key.
 * @remarks Capitalized member aliases are ignored.
 */
function entries() {
  return this[Keys]()
    .map(key => ({ key, value: this[key] }))
}

module[ExportStaticExtension](Interface, entries)