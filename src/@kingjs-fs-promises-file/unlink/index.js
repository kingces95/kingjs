var { 
  fs: { promises: fs },
  ['@kingjs']: { 
    Path,
    module: { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Unlinks a file at the path.
 * 
 * @this PathBuilder The path to unlink.
 */
async function unlink() {
  return fs.unlink(this.buffer)
}

module[ExportExtension](Path.Builder, unlink)