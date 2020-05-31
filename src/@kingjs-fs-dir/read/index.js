var { fs,
  '@kingjs': { Path,
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
function readdir(options = EmptyObject) {
  return fs.readdirSync(this.buffer, options)
}

module[ExportExtension](Path.Builder, readdir)