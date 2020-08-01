var { fs, fs: { promises: fsPromises },
  '@kingjs': { Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Recursive = { recursive: true }
var MkdirSync = fs.mkdirSync.bind(fs)
var MkdirAsync = fsPromises.mkdir.bind(fsPromises)

/**
 * @description Create a directory.
 * 
 * @this PathBuilder The directory in which the new directory is created.
 * @param name The name of the new directory.
 * @returns Returns a path to the directory created. 
 *
 * @remarks The directory the new directory will be created if it does not exists.
 */
function make(name, options = EmptyObject) {
  var { async, name } = options
  
  var target = this
  if (name)
    target = target.to(this)

  var promise = (async ? MkdirAsync : MkdirSync)(target.buffer, Recursive)
  return async ? promise.then(() => target) : target
}

module[ExportExtension](Path.Builder, make)