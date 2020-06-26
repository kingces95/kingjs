var { 
  '@kingjs': {
    '-reflect': { is },
    '-interface': { Interface, Entries },
    '-module': { ExportStaticExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var toArray = o => is.array(o) ? o : [o]

/**
 * @description Return a mapping from symbols to member names.
 * @param iface The interface. 
 * @returns Returns a pojo where each property key is a symbol
 * of the interface and each property value is the name associated
 * with the corrisponding property's key.
 * @remarks Capitalized member aliases are ignored.
 */
function map() {
  return this[Entries]()
    .map(entry => toArray(entry.value)
      .map(value => ({ 
        key: entry.key, 
        value 
      }))
    )
    .flat()
    .reduce((result, o) => { 
      result[o.value] = o.key; 
      return result
    }, { })
}


module[ExportStaticExtension](Interface, map)