var {
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-fs-dir': { Write },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to write.
 * 
 * @returns Binary data or text.
 */
function overwrite(data, options = EmptyObject) {
  return this.dir[Write](this.name, data, options)
}

module[ExportExtension](Path.Builder, overwrite)