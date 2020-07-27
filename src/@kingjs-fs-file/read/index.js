var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-fs-link': { Read: ReadLink }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Utf8 = 'utf8'
var Buffer = 'buffer'
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
function read(options = EmptyObject) {
  var { async, link, encoding = Utf8 } = options

  if (encoding == Buffer)
    encoding = null

  if (link)
    return this[ReadLink](options)

  return (async ? readAsync : readSync)(this.buffer, { encoding })
}

module[ExportExtension](Path.Builder, read)