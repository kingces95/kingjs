var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var copySync = fs.copyFileSync.bind(fs)
var copyAsync = fsp.copyFile.bind(fsp)

/**
 * @description Copy a file.
 * 
 * @this PathBuilder The path to check.
 */
function copyFile(dir, options = EmptyObject) {
  var { async, name } = options
  var target = dir.to(name ? name : this.name)
  var promise = (async ? copyAsync : copySync)(this.buffer, target.buffer, options)
  return async ? promise.then(() => target) : target
}

module[ExportExtension](Path.Builder, copyFile)