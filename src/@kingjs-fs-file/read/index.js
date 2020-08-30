var { fs, fs: { promises: fsp },
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Utf8 = 'utf8'
var Buffer = 'buffer'
var readSync = fs.readFileSync.bind(fs)
var readAsync = fsp.readFile.bind(fsp)
var readLinkSync = fs.readlinkSync.bind(fs)
var readLinkAsync = fsp.readlink.bind(fsp)

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
    return readLink.call(this, options)

  return (async ? readAsync : readSync)(this.buffer, { encoding })
}

function readLink(options) {
  var { async } = options

  var link = (async ? readLinkAsync : readLinkSync)(this.buffer, Utf8)

  var epilog = link => {
    var path = Path.parse(link)  
    return this.dir.to(path)
  }

  return async ? link.then(epilog) : epilog(link)
}

module[ExportExtension](Path.Builder, read)