var { fs,
  '@kingjs': { Path,
    EmptyObject,
    '-module': { ExportExtension } 
  }
} = module[require('@kingjs-module/dependencies')]()

var existsSync = fs.existsSync.bind(fs)
var existsAsync = path => new Promise(resolve => fs.exists(path, o => resolve(o)))

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function exists(options = EmptyObject) {
  return (options.async ? existsAsync : existsSync)(this.buffer)
}

module[ExportExtension](Path.Builder, exists)