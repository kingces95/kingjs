var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var writeSync = fs.writeFileSync.bind(fs)
var writeAsync = fsp.writeFile.bind(fsp)
/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to write.
 * 
 * @returns Binary data or text.
 */
function writeFile(data, options = EmptyObject) {
  return (options.async ? writeAsync : writeSync)(this.buffer, data, options)
}

module[ExportExtension](Path.Builder, writeFile)