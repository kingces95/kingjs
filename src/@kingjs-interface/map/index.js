var { 
  '@kingjs': {
    '-reflect': { is },
    '-interface': { Interface, Entries },
    '-module': { ExportStaticExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var toArray = o => is.array(o) ? o : [o]

/**
 * @description Return an map from symbol to member.
 * @param iface The interface. 
 * @returns Returns a pojo where each key/value is a mapping to
 * interface symbol/name.
 * 
 * @remarks The member names returned are not capitalized.
 */
function map() {
  return this[Entries]()
    .map(entry => toArray(entry.symbol)
      .map(symbol => ({ 
        member: entry.member, 
        symbol 
      }))
    )
    .flat()
    .reduce((result, o) => { 
      result[o.symbol] = o.member; 
      return result
    }, { })
}

module[ExportStaticExtension](Interface, map)