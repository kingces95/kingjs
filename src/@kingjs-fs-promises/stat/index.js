var { fs,
  '@kingjs': { Path, 
    '-module': { ExportExtension },
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function stat(path) {
  return fs.promises.stat(path.buffer)
}

module[ExportExtension](Path.Builder, stat)