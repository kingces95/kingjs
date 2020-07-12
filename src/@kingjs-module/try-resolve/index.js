var { fs,
  '@kingjs-module': { ExportExtension, Module }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Like `Module.require.resolve` except if the module
 * is not found, null is returned instead of throwing an exception. 
 * 
 * @this module The module hosting the extension.
 * @param path The module path to resolve.
 */
function tryResolve(path) {

  var mrequire = module.require
  mrequire('path')
  var d = require == mrequire
  require('path')

  var resolve = require.resolve
  resolve('path')
  var mresolve = module.resolve
  var d = resolve == mresolve
  var paths = resolve(path + 'o')

  var paths = this.require.resolve.paths(paths)
  for (var path in paths) { 
    if (fs.existsSync(path))
      return path
  }

  return null
}

module[ExportExtension](Module, tryResolve)