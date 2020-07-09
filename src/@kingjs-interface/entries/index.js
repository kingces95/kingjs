var { 
  '@kingjs': {
    '-interface': { Interface, Members },
    '-module': { ExportStaticExtension },
    '-string': { Capitalize }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Return the symbols associated with each
 * member of the interface.
 * @this The interface.
 * @returns Return an array of { member, symbol } pojo, where
 * `member` is the member name and `symbol` is a symbol or 
 * an array of symbols associated with the member.
 * 
 * @remarks The member names returned are not capitalized.
 */
function entries() {
  return this[Members]()
    .map(member => ({ 
      member, 
      symbol: this[member[Capitalize]()] 
    }))
}

module[ExportStaticExtension](Interface, entries)