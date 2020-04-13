var { 
  fs: { promises: fs },
  ['@kingjs']: { 
    path: {
      Builder: Path
    },
    defineExtension,
  }
} = require('./dependencies')

var { name, version } = require('./package.json');
var Recursive = { recursive: true }

/**
 * @description Test if a path exists.
 * 
 * @this PathBuilder The path to check.
 */
function removeDir() {
  return fs.rmdir(this.buffer, Recursive)
}

module.exports = defineExtension(
  Path.prototype, name, version, removeDir
);