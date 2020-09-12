var { fs, fs: { promises: fsp },
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Utf8 = 'utf8'
var Buffer = 'buffer'
var readSync = fs.readFileSync.bind(fs)
var readAsync = fsp.readFile.bind(fsp)

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to read.
 * @param options Pojo of the form { async, encoding }
 * @returns Binary data or text.
 */
function read(options = EmptyObject) {
  var { async, encoding = Utf8 } = options

  if (encoding == Buffer)
    encoding = null

  return (async ? readAsync : readSync)(this.buffer, { encoding })
}

module[ExportExtension](Path.Builder, read)