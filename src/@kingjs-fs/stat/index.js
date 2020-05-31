var { fs,
  '@kingjs': { Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Reads the stats for a path.
 * 
 * @this PathBuilder The path to read.
 * @param options The `stat` options .
 * 
 * @returns A 'Stat' for the path.
 */
function stat(options = EmptyObject) {
  return fs.statSync(this.buffer, options)
}

module[ExportExtension](Path.Builder, stat)