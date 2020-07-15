var { fs, fs: { promises: fsPromises },
  '@kingjs': { Path,
    '-dir-entry': { DirEntry },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Options = { withFileTypes: true }
var Compare = (l, r) => l.name < r.name
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

  var dirents = (async ? ReadDirAsync : ReadDirSync)(this.buffer, Options)

  var epilog = result => {
    return result
      .map(o => DirEntry.create(o, this.to(o.name)))
      .sort(Compare)
  }

  return async ? dirents.then(epilog) : epilog(dirents)
}

module[ExportExtension](Path.Builder, list)