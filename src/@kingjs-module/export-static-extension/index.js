var Path = require('path')
var Module = require('@kingjs-module/module')

var PackageJson = 'package.json'
var Function = 'function'

/**
 * @description The description.
 * 
 * @this Module The module exporting the extension symbol.
 * 
 * @param target The function to be extended.
 * @param extension The extension as a function or descriptor.
 * 
 * @remarks The `package.json` must be in the same directory as the
 * module exporting the extension.
 */
function exportStaticExtension(target, descriptor) {

  if (typeof descriptor == Function)
    descriptor = { value: descriptor }

  // define symbol
  var { name, version } = this.require(Path.join(this.path, PackageJson))
  var symbol = Symbol(`${name}, ${version}`)

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