var { assert,
  '@kingjs': {
    '-module': { Module, ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Add function `extension` to `Object` but add a thunk that only
 * allows it to be called if `this` is an `instanceof` interface `iface`.
 * 
 * @this Module The module exporting the interface.
 * @param iface The interface to extend.
 * @param extension The function to attach to any instance implementing `iface`.
 * @return Return the symbol used to publish the extension on `Object`.
 */
function exportInterfaceExtension(iface, extension) {
  var thunk = function() {
    assert.ok(this instanceof iface)
    return extension.call(this, ...arguments)
  }
  
  Object.defineProperty(
    thunk, 'name', { value: `${iface.name}.${extension.name}() (extension)` }
  )

  return this[ExportExtension](Object, thunk)  
}

module[ExportExtension](Module, exportInterfaceExtension)