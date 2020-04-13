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
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to read.
 * 
 * @returns Binary data or text.
 */
async function writeFile(data) {
  return fs.writeFile(this.buffer, data)
}

module.exports = defineExtension(
  Path.prototype, name, version, writeFile
);