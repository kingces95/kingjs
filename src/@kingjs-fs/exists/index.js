var { fs,
  '@kingjs': { Path,
    '-module': { ExportExtension } 
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function exists() {
  return fs.existsSync(this.buffer)
}

module[ExportExtension](Path.Builder, exists)