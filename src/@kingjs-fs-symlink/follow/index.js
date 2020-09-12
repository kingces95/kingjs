var { fs, fs: { promises: fsp },
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Utf8 = 'utf8'
var readLinkSync = fs.readlinkSync.bind(fs)
var readLinkAsync = fsp.readlink.bind(fsp)

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to read.
 * @param options Pojo of the form `{ async }`. 
 * @returns Binary data or text.
 */
function follow(options = EmptyObject) {
  var { async } = options

  var link = (async ? readLinkAsync : readLinkSync)(this.buffer, Utf8)

  var epilog = link => {
    var path = Path.parse(link)  
    return this.dir.to(path)
  }

  return async ? link.then(epilog) : epilog(link)
}

module[ExportExtension](Path.Builder, follow)