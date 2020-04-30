var { 
  fs: { promises: fs },
  ['@kingjs']: { 
    Path,
    module: { ExportExtension },
  }
} = require('./dependencies')

var Recursive = { recursive: true }

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function removeDir() {
  return fs.rmdir(this.buffer, Recursive)
}

module[ExportExtension](Path.Builder, removeDir)