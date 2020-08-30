var { fs, fs: { promises: fsPromises },
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Recursive = { recursive: true }
var RmdirSync = fs.rmdirSync.bind(fs)
var RmdirAsync = fsPromises.rmdir.bind(fsPromises)

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function removeDir(options = EmptyObject) {
  var { async } = options
  return (async ? RmdirAsync : RmdirSync)(this.buffer, Recursive)
}

module[ExportExtension](Path.Builder, removeDir)