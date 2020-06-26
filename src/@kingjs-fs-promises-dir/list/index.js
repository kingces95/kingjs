var {
  '@kingjs': { Path,
    '-fs-dir': { DirEntry },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
async function list(options = EmptyObject) {
  return DirEntry.listAsync(this, options)
}

module[ExportExtension](Path.Builder, list)