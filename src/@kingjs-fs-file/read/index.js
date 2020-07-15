var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var readSync = fs.readFileSync.bind(fs)
var readAsync = fsp.readFile.bind(fsp)

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to read.
 * @param options Selects a partition name from each element 
 * 
 * @returns Binary data or text.
 */
function readFile(options = EmptyObject) {
  var { async } = options
  return (async ? readAsync : readSync)(this.buffer, options)
}

module[ExportExtension](Path.Builder, readFile)