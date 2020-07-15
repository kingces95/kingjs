var { fs, Path,
  '@kingjs-module': { ExportExtension, Module }
} = module[require('@kingjs-module/dependencies')]()

var PackageJson = 'package.json'

/**
 * @description Like `Module.require.resolve` except if the module
 * is not found, null is returned instead of throwing an exception. 
 * 
 * @this module The module hosting the extension.
 * @param path The module path to resolve.
 */
function resolve(path) {
  for (var dir in this.paths) { 
    var path = Path.join(path, PackageJson)
    if (fs.existsSync(path))
      return path
  }

  return null
}

module[ExportExtension](Module, resolve)