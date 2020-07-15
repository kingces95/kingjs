var { fs, fs: { promises: fsPromises },
  '@kingjs': { Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Recursive = { recursive: true }
var MkdirSync = fs.mkdirSync.bind(fs)
var MkdirAsync = fsPromises.mkdir.bind(fsPromises)

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function makeDir(options = EmptyObject) {
  var { async } = options
  return (async ? MkdirAsync : MkdirSync)(this.buffer, Recursive)
}

module[ExportExtension](Path.Builder, makeDir)