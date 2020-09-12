var { fs, fs: { promises: fsp },
  '@kingjs': { EmptyObject, EmptyBuffer, Path,
    '-module': { ExportExtension },
    '-fs': { Flags },
  }
} = module[require('@kingjs-module/dependencies')]()

var writeSync = fs.writeFileSync.bind(fs)
var writeAsync = fsp.writeFile.bind(fsp)

/**
 * @description Create a file and write data to that file.
 * 
 * @this PathBuilder The directory of the file.
 * @param name The name of the file.
 * @param data The data to write which can be a buffer or string.
 * @param options A pojo of the form `{ async }`.
 * @returns Returns the path of the file.
 * 
 * @remarks If the file exists, it is overwritten.
 * @remarks If `options.async` then a promise to the path of the file is returned.
 */
function write(name, data = EmptyBuffer, options = EmptyObject) {
  var { async, encoding, flag = Flags.OpenNewForWriting } = options
  var path = this.to(name)

  var promise = (async ? writeAsync : writeSync)(path.buffer, data, { flag, encoding })
  return async ? promise.then(() => path) : path
}

module[ExportExtension](Path.Builder, write)