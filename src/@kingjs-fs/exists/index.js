var { fs,
  '@kingjs': { Path,
    '-module': { ExportExtension } 
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function exists(options = EmptyObject) {
  var { async } = options

  if (async)
    return new Promise(resolve => fs.exists(this.buffer, o => resolve(o)))

  return fs.existsSync(this.buffer)
}

module[ExportExtension](Path.Builder, exists)