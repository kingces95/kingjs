var { 
  fs: { promises: fs },
  ['@kingjs']: { 
    Path,
    module: { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Copy a file.
 * 
 * @this PathBuilder The path to check.
 */
function copyFile(target) {
  return fs.copyFile(this.buffer, target.buffer)
}

module[ExportExtension](Path.Builder, copyFile)