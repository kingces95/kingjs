var { 
  fs,
  ['@kingjs']: { 
    path: { Builder: Path },
    module: { ExportExtension },
  }
} = require('./dependencies')

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function exists() {
  return fs.existsSync(this.buffer)
}

module[ExportExtension](Path, exists)