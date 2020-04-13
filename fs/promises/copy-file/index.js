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

/**
 * @description Copy a file.
 * 
 * @this PathBuilder The path to check.
 */
function copyFile(target) {
  return fs.copyFile(this.buffer, Path.create(target).buffer)
}

module.exports = defineExtension(
  Path.prototype, name, version, copyFile
)