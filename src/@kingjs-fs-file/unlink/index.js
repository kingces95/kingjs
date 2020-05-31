var {  fs,
  '@kingjs': { Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Unlinks a file at the path.
 * 
 * @this PathBuilder The path to unlink.
 */
function unlink() {
  return fs.unlinkSync(this.buffer)
}

module[ExportExtension](Path.Builder, unlink)