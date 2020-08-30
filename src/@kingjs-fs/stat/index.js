var { fs, fs: { promises: fsp },
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var statSync = fs.statSync.bind(fs)
var statAsync = fsp.stat.bind(fsp)
var linkStatSync = fs.lstatSync.bind(fs)
var linkStatAsync = fsp.lstat.bind(fsp)

/** 
 * @description Reads the stats for a path.
 * 
 * @this PathBuilder The path to read.
 * @param options The `stat` options .
 * 
 * @returns A 'Stat' for the path.
 */
function stat(options = EmptyObject) {
  var { async, link } = options

  if (link)
    return (async ? linkStatAsync : linkStatSync)(this.buffer, options)

  return (async ? statAsync : statSync)(this.buffer, options)
}

module[ExportExtension](Path.Builder, stat)