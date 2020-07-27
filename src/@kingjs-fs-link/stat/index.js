var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var statSync = fs.lstatSync.bind(fs)
var statAsync = fsp.lstat.bind(fsp)

/** 
 * @description Reads the stats for a path.
 * 
 * @this PathBuilder The path to read.
 * @param options The `stat` options .
 * 
 * @returns A 'Stat' for the path.
 */
function stat(options = EmptyObject) {
  return (options.async ? statAsync : statSync)(this.buffer, options)
}

module[ExportExtension](Path.Builder, stat)