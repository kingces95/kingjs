var assert = require('assert')
var Module = require('@kingjs-module/module')
var ExportStaticExtension = require('@kingjs-module/export-static-extension')


/**
 * @description Publishes a function on a function's prototype 
 * using a symbol for a key derived from the package metadata.
 * 
 * @this Module The module exporting the symbol.
 * @param target The function whose prototype `extension` is published.
 * @param extension The extension as a function or descriptor.
 */
function exportExtension(type, descriptor) {
  assert(type instanceof Function)
  return this[ExportStaticExtension](type.prototype, descriptor)
}

module[ExportStaticExtension](Module.prototype, exportExtension)