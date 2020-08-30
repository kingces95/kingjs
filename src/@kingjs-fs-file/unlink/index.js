var { fs, fs: { promises: fsp },
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var unlinkSync = fs.unlinkSync.bind(fs)
var unlinkAsync = fsp.unlink.bind(fsp)

/**
 * @description Unlinks a file at the path.
 * 
 * @this PathBuilder The path to unlink.
 */
function unlink(options = EmptyObject) {
  return (options.async ? unlinkAsync : unlinkSync)(this.buffer, options)
}

module[ExportExtension](Path.Builder, unlink)