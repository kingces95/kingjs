var { fs,
  '@kingjs': { Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Recursive = { recursive: true }

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function makeDir() {
  return fs.mkdirSync(this.buffer, Recursive)
}

module[ExportExtension](Path.Builder, makeDir)