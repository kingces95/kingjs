var { fs: { promises: fs },
  '@kingjs': { Path,
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
  return await fs.readdir(this.buffer, options)
}

module[ExportExtension](Path.Builder, list)