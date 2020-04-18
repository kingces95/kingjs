var { 
  fs,
  ['@kingjs']: { 
    path: { Builder: Path },
    module: { ExportExtension },
  }
} = require('./dependencies')

/**
 * @description Unlinks a file at the path.
 * 
 * @this PathBuilder The path to unlink.
 */
async function unlink() {
  return fs.unlinkSync(this.buffer)
}

module[ExportExtension](Path, unlink)