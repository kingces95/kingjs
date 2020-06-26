var { fs,
  '@kingjs': { Path,
    '-fs-dir': { DirEntry },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Reads a directory at the path.
 * 
 * @this PathBuilder The path to read.
 * @param options The `readdirSync` options 
 * 
 * @returns An array of `DirEnt` for the path.
 */
function list(options = EmptyObject) {
  return DirEntry.list(this, options)
}

module[ExportExtension](Path.Builder, list)