var { 
  fs,
  ['@kingjs']: { 
    path: {
      Builder: Path
    },
    defineExtension,
  }
} = require('./dependencies')

var { name, version } = require('./package.json');

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

module.exports = defineExtension(
  Path.prototype, name, version, exists
);