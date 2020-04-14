var { 
  fs: { promises: fs },
  ['@kingjs']: { 
    path: {
      Builder: Path
    },
    module: { ExportExtension },
  }
} = require('./dependencies')

/**
 * @description Copy a file.
 * 
 * @this PathBuilder The path to check.
 */
function copyFile(target) {
  return fs.copyFile(this.buffer, Path.create(target).buffer)
}

module[ExportExtension](Path, copyFile)