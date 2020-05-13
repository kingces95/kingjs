var { assert,
  '@kingjs': {
    '-reflect': { is },
  }
} = module[require('@kingjs-module/dependencies')]()

var Id = Symbol.for('Interface.Id')
var ActivationError = 'Cannot activate interface.'

/**
 * @description An interface is a mapping from  
 * a member name to a set of one or more symbols.
 * 
 * @remarks - `Interface` supports the `instanceof` operator.
 * @remarks -- An instance is an `instanceof` an `Interface` if it 
 * defined a proeprty for every symbol exposed by static properties 
 * of the interface.
 * @remarks - An interface cannot be activated.
 * @remarks - By convention derivations of `Interface`
 * @remarks -- have names starting with a capital `I`.
 * @remarks -- define only static properties that return either
 * @remarks --- a symbol.
 * @remarks --- an array of symbols.
 * */
class Interface {

  constructor() {
    throw ActivationError
  }

  // static extend(iface, symbol, extension) {
  // }

  /**
   * @description Test if `instance` implements `iface`.
   * 
   * @this any The interface.
   * @param instance The instance to test.
   * 
   * @result Returns `true` if each symbol of `iface` is used
   * as a key for a property in `instance`, otherwise `false.
   * 
   * @remarks If `true`, then the instance and any of it's prototypes
   * which implement the interface will be tagged with the id of the
   * interface.
   */
  static [Symbol.hasInstance](instance) {
    var iface = this

    // get symbol identifying interface
    var Tag = iface[Id]
    if (!Tag)
      iface[Id] = Tag = Symbol(`implements ${iface.name}`)

    // test if instance implements interface
    if (Tag in instance)
      return true

    // tag the instance and any of it's prototypes that implement
    // the interface as having implemented the interface
    var prototype = instance
    while (isImplementedBy(iface, prototype)) {
      prototype[Tag] = null
      prototype = Object.getPrototypeOf(prototype)
    }

    // re-test the instance for being tagged as implementing the interface
    return Tag in instance
  }
}

/**
 * @description Test if `instance` implements `iface`.
 * 
 * @param iface The interface.
 * @param instance The instance to test.
 * 
 * @result Returns `true` if each symbol of `iface` is used
 * as a key for a property in `instance`, otherwise `false.
 */
function isImplementedBy(iface, instance) {
  var result = false

  for (var name of Object.getOwnPropertyNames(iface)) {
    var symbol = iface[name]

    if (is.array(symbol)) {
      for (var overload of symbol) {
        assert(is.symbol(overload))
        if (overload in instance == false)
          return false
      }
    }

    else if (!is.symbol(symbol))
      continue

    else if (symbol in instance == false)
      return false

    result = true
  }

  return result
}

module.exports = Interface