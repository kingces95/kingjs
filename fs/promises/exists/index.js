var { 
  fs
} = require('./dependencies')

/**
 * @description Asynchronously test if a path exists.
 * 
 * @param path That path whose existence is to be tested.
 * 
 * @returns Returns `true` if the path exists, otherwise `false`.
 */
function pathExists(path) {
  return new Promise(resolve => fs.exists(path, o => resolve(o)))
}

module.exports = pathExists