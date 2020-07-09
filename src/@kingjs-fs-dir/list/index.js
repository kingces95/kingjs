var { fs,
  '@kingjs': { Path,
    '-fs-dir': { DirEntry },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var Compare = (l, r) => l.name < r.name

var EmptyObject = { }

/**
 * @description Reads a directory at the path.
 * 
 * @this PathBuilder The path to read.
 * @param options The `readdirSync` options 
 * 
 * @returns An array of `DirEnt` for the path.
 */
function list(options = EmptyObject) {
  var { withFileTypes, sort, async } = options

  // sync/async
  var dirents = async ?
    fsPromises.readdir(path.buffer, options) :
    fs.readdirSync(path.buffer, options)

  function callback() {

    // DirEntry/string
    if (withFileTypes)
      dirents = dirents.map(o => new DirEntry(o, path.to(o.name)))

    // sort/unsorted
    if (sort) 
      dirents.sort(withFileTypes ? Compare : undefined)

    return dirents
  }

  if (async)
    return dirents.then(callback)

  return callback()
}

module[ExportExtension](Path.Builder, list)