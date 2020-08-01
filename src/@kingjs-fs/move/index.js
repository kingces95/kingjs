var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var renameSync = fs.renameSync.bind(fs)
var renameAsync = fsp.rename.bind(fsp)

/** 
 * @description Reads the stats for a path.
 * 
 * @this PathBuilder The path to read.
 * @param options The `stat` options .
 * 
 * @returns A 'Stat' for the path.
 */
function move(dir, options = EmptyObject) {
  var { async, name } = options

  var target = dir
  if (name)
    target = dir.to(name)

  var promise = (async ? renameAsync : renameSync)(this.buffer, target.buffer)
  return async ? promise.then(() => target) : target
}

module[ExportExtension](Path.Builder, move)