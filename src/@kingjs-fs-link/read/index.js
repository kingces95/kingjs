var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Utf8 = 'utf8'
var EmptyObject = { }
var readLinkSync = fs.readlinkSync.bind(fs)
var readLinkAsync = fsp.readlink.bind(fsp)

/**
 * @description Links a path to a directory or file target.
 * 
 * @this PathBuilder The symlink.
 * @param raw If true, returns the target of the link relative to its directory.
 * 
 * @returns Returns the target path of the link.
 */
function read(options = EmptyObject) {
  var { async } = options

  var link = (async ? readLinkAsync : readLinkSync)(this.buffer, Utf8)

  var epilog = link => {
    var path = Path.parse(link)  
    return this.dir.to(path)
  }

  return async ? link.then(epilog) : epilog(link)
}

module[ExportExtension](Path.Builder, read)