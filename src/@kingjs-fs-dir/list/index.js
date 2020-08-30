var { assert, fs, fs: { promises: fsPromises },
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { withFileTypes: true }
var Compare = (l, r) => l.name < r.name
var ReadDirAsync = fsPromises.readdir.bind(fsPromises)
var ReadDirSync = fs.readdirSync.bind(fs)

class Dirent {
  constructor(dirent) {
    this.name = dirent.name
    
    if (dirent.isFile())
      this.isFile = true
    else if (dirent.isDirectory())
      this.isDirectory = true
    else if (dirent.isSymbolicLink())
      this.isSymbolicLink = true

    assert.ok(
      this.isFile ||
      this.isDirectory ||
      this.isSymbolicLink
    )
  }
}

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
  var epilog = result => result.sort(Compare).map(o => new Dirent(o))
  return async ? dirents.then(epilog) : epilog(dirents)
}

module[ExportExtension](Path.Builder, list)