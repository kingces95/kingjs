var { assert,
  '@kingjs-reflect': { is },
} = module[require('@kingjs-module/dependencies')]()

var EmptyString = ''

/**
 * @description Extends `kingjs/reflect.define-property` to map names
 * to symbols according to iface.
 * 
 * @param instance The instance on which the interface members will be defined.
 * @param iface A map for names to symbols used to rename properties declared
 * in the descriptor.
 * @param members Property descriptors defined here are copied to instance but
 * with its corresponding symbolic name found on iface.
 * 
 * @returns Returns type.
 */
function implementInterface(instance, iface, members) {

  if (EmptyString in iface)
    instance[iface[EmptyString]] = null

  //var inherited = Object.getPrototypeOf(iface)

  // explicit definitions take precedence
  var symbols = Object.getOwnPropertySymbols(members)
  implementMembers(iface, symbols)
  //implementMembers(inherited, symbols)

  var names = Object.getOwnPropertyNames(members)
  implementMembers(iface, names)
  //implementMembers(inherited, names)

  assert(Object.create(instance) instanceof iface)
  return instance

  function implementMembers(map, keys) {
    
    // define members
    for (var key of keys) {

      // map name
      var symbolOrSymbols = is.symbol(key) ? key : map[key]
      if (!symbolOrSymbols)
        continue

      if (is.symbol(symbolOrSymbols))
        implementMember(symbolOrSymbols)

      else for (var symbol of Object.getOwnPropertySymbols(symbolOrSymbols))
        implementMember(symbol)
    }
    return

    function implementMember(symbol) {
      if (instance.hasOwnProperty(symbol))
        return

      // transplant descriptor
      var descriptor = Object.getOwnPropertyDescriptor(members, key)
      Object.defineProperty(instance, symbol, descriptor)
    }
  }
}

module.exports = implementInterface