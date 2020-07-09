var Module = require('@kingjs-module/module')
var Package = require('@kingjs-package/package')
var For = require('@kingjs-symbol/for')

var Function = 'function'

/**
 * @description Publishes a function on a function using a symbol
 * for a key derived from the package metadata.
 * 
 * @this Module The module exporting the symbol.
 * @param target The function on which `extension` is published.
 * @param extension The extension as a function or descriptor.
 */
function exportStaticExtension(target, descriptor) {
  if (typeof descriptor == Function)
    descriptor = { value: descriptor }


  // load package metadata
  var { camelCaseName: name, scope, major, minor, patch } = Package.fromPath(this.path)

  // construct symbol from package metadata
  var symbol = Symbol[For](name, { scope, version: { major, minor, patch } })

  // define extension
  Object.defineProperty(
    target, 
    symbol, 
    descriptor
  )

  // export symbol
  this.exports = symbol
}

exportStaticExtension.call(
  module,
  Module.prototype,
  exportStaticExtension
)