var {
  ['@kingjs']: {
    reflect: { 
      defineProperty,
      createSymbol
    }
  }
} = require('./dependencies')

var Exports = 'exports'

/**
 * @description Extend a type with a property and return a symbol
 * whose debug name is derived from the module hosting the extension.
 * 
 * @param module The module hosting the extension.
 * @param type The type being extended. 
 * @param descriptor The descriptor describing the property.
 * 
 * @returns Returns the symbol name of the property. The symbol is not
 * registered. The symbol's debug name is the hosting module 
 * name and its version.
 * 
 * @remarks If the type is an interface than all types implementing the 
 * interface are extended.
 * @remarks Overloads are similar to those provided by 
 * `@kingjs/reflect.define-property`
 */
function exportExtension(module, type, descriptor) {
  var symbol = createSymbol(module)

  var { descriptor } = defineProperty(null, symbol, descriptor)
  descriptor.extends = () => type
  defineProperty(Object.prototype, symbol, descriptor)

  defineProperty(module, Exports, symbol)
  return symbol
}

module.exports = exportExtension