var Path = require('path')

var PackageJson = 'package.json'
var Function = 'function'

/**
 * @description The description.
 * 
 * @this Module The module exporting the extension symbol.
 * 
 * @param type The function whose prototype will be extended.
 * @param extension The extension as a function or descriptor.
 * 
 * @remarks The `package.json` must be in the same directory as the
 * module exporting the extension.
 */
function exportExtension(type, descriptor) {

  if (typeof descriptor == Function)
    descriptor = { value: descriptor }

  // define symbol
  var { name, version } = this.require(Path.join(this.path, PackageJson))
  var symbol = Symbol(`${name}, ${version}`)

  // define extension
  Object.defineProperty(
    type.prototype, 
    symbol, 
    descriptor
  )

  // export symbol
  this.exports = symbol
}

exportExtension.call(
  module,
  Object.getPrototypeOf(module).constructor,
  exportExtension
)