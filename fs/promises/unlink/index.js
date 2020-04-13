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
 * @description Unlinks a file at the path.
 * 
 * @this PathBuilder The path to unlink.
 */
async function unlink() {
  return fs.unlink(this.buffer)
}

module.exports = defineExtension(
  Path.prototype, name, version, unlink
);