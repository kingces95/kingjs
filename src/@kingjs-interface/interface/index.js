var assert = require('assert')
var isArray = require('@kingjs-reflect/is-array')
var isSymbol = require('@kingjs-reflect/is-symbol')

var Id = Symbol.for('Interface.Id')
var ActivationError = 'Cannot activate interface.'

/**
 * @description A map from a string name to a symbol or array of symbols.
 * 
 * @remarks - `Interface` supports the `instanceof` operator. An instance 
 * defining properties for every symbol of an `Interface` is an `instanceof` 
 * that `Interface`.
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

  /**
   * @description Test if `instance` implements `iface`.
   * 
   * @this any The interface.
   * @param instance The instance to test.
   * 
   * @result Returns `true` if each symbol of `iface` is used
   * as a key for a property in `instance`, otherwise `false.
   * 
   * @remarks Primitive strings and numbers are boxed, and their 
   * prototypes substituted for the instance.
   * @remarks If `true`, then the instance and any of it's prototypes
   * which implement the interface will be tagged with the id of the
   * interface.
   */
  static [Symbol.hasInstance](instance) {
    var iface = this

    // get symbol identifying interface
    var Tag = iface[Id]
    if (!Tag)
      iface[Id] = Tag = Symbol(`${iface.name}, (tag)`)

    // box primitive string & number
    if (typeof instance == 'string')
      instance = String.prototype
    if (typeof instance == 'number')
      instance = Number.prototype

    // test if instance implements interface
    if (Tag in instance)
      return true

    // tag the instance and any of it's prototypes that implement
    // the interface as having implemented the interface
    var prototype = instance
    while (isImplementedBy(iface, prototype)) {
      Object.defineProperty(prototype, Tag, { value: null })
      prototype = Object.getPrototypeOf(prototype)
    }

    // re-test the instance for being tagged as implementing the interface
    return Tag in instance
  }
}

function isImplementedBy(iface, instance) {
  var result = false

  for (var name of Object.getOwnPropertyNames(iface)) {
    var symbol = iface[name]

    if (isArray(symbol)) {
      for (var overload of symbol) {
        assert(isSymbol(overload))
        if (instance[overload] === undefined)
          return false
      }
    }

    else if (!isSymbol(symbol))
      continue

    else if (instance[symbol] === undefined)
      return false

    result = true
  }

  return result
}

module.exports = Interface