var { fs, fs: { promises: fsp },
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-fs-link': { Stat: LinkStat },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var statSync = fs.statSync.bind(fs)
var statAsync = fsp.stat.bind(fsp)

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
    return this[LinkStat](options)

  return (async ? statAsync : statSync)(this.buffer, options)
}

module[ExportExtension](Path.Builder, stat)