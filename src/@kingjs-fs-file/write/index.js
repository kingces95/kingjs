var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-fs-link': { Write: WriteLink },
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
  var { async, link } = options

  if (link)
    return this[WriteLink](data, options)

  var promise = (async ? writeAsync : writeSync)(this.buffer, data, options)
  return async ? promise.then(() => this) : this
}

module[ExportExtension](Path.Builder, writeFile)