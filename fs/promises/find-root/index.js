var { 
  fs,
  Path,
  ['@kingjs']: {
    fs: {
      promises: {
        exists 
      }
    }
  }
} = require('./dependencies')

/**
 * @description Searches up a path for a file.
 * 
 * @param dir That path whose existence is to be tested.
 * @param file That path whose existence is to be tested.
 * 
 * @returns Returns the nearest path that contains the file.
 */
async function findRoot(dir, file) {
  while (true) {
    var path = Path.join(dir, file)
    if (await exists(path))
      return path

    var parent = Path.dirname(dir)
    if (parent == dir)
      break
    dir = parent
  }
}

findRoot(process.cwd(), 'npm-scope2.json')

module.exports = findRoot