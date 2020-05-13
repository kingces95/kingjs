var { Path,
  '@kingjs-module': { ExportExtension, Module }
} = module[require('@kingjs-module/dependencies')]()

var PackageJson = './package.json'

/**
 * @description Creates a symbol with a debug string derived from the
 * module name. 
 * 
 * @this module The module hosting the extension.
 * @param [id] The id of the symbol.
 * 
 * @returns Returns a symbol whose name is of the form module name, 
 * optionally followed by dot plus `id`, followed by a comma and the module version.
 */
function createSymbol(id) {
  var { name, version } = this.require(Path.join(this.path, PackageJson))

  if (id)
    name += `.${id}`

  var symbol = Symbol(`${name}, ${version}`)
  return symbol
}

module[ExportExtension](
  Module, 
  createSymbol
)