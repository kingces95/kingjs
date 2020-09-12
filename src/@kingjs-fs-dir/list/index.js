var { fs, fs: { promises: fsPromises },
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var ReadDirAsync = fsPromises.readdir.bind(fsPromises)
var ReadDirSync = fs.readdirSync.bind(fs)

/**
 * @description Reads a directory at the path.
 * 
 * @this PathBuilder The path to read.
 * @param options A pojo of the form `{ async }` where async specifies
 * if a promise to return the results.
 * 
 * @returns An array of `DirEntry` objects found at the path.
 */
function list(options = EmptyObject) {
  var { async } = options

  var promise = (async ? ReadDirAsync : ReadDirSync)(this.buffer)
  var epilog = o => o.sort().map(x => this.to(x))
  return async ? promise.then(epilog) : epilog(promise)
}

module[ExportExtension](Path.Builder, list)