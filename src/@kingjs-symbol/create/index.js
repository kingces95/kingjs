var { Path,
  '@kingjs': {
    '-module': { ExportExtension, Type: Module }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyString = ''

/**
 * @description Creates a symbol with a 
 * 
 * @param name The name of the symbol.
 * @param scope The npm scope of the symbol's name.
 * @param [version] The version of the module.
 * @param [member] The module hosting the extension.
 * 
 * @returns Returns a symbol whose name is of the form module name, 
 * optionally followed by dot plus `id`, followed by a comma and the module version.
 */
function createSymbol(name, scope, version, member = null) {
  var fullName = member ? `${name}.${member}` : name
  var module = version ? `${scope}, v${version}` : scope
  return Symbol.for(`${fullName}, ${module}`)
}

module.exports = createSymbol