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
function rename(target, options = EmptyObject) {
  return (options.async ? renameAsync : renameSync)(this.buffer, target.buffer)
}

module[ExportExtension](Path.Builder, rename)