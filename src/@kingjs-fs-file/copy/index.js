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
function copyFile(target, options = EmptyObject) {
  return (options.async ? copyAsync : copySync)(this.buffer, target.buffer, options)
}

module[ExportExtension](Path.Builder, copyFile)