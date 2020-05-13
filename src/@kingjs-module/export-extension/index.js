var Module = require('@kingjs-module/module')
var ExportStaticExtension = require('@kingjs-module/export-static-extension')

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
  return this[ExportStaticExtension](type.prototype, descriptor)
}

module[ExportStaticExtension](Module.prototype, exportExtension)