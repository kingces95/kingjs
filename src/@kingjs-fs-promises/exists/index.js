var { 
  fs,
  ['@kingjs']: { 
    Path,
    module: {
      ExportExtension
    },
  }
} = require('./dependencies')

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function exists() {
  return new Promise(resolve => fs.exists(this.buffer,
    o => resolve(o)
  ))
}

module[ExportExtension](Path.Builder, exists)