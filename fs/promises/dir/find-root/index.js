var { 
  Path,
  ['@kingjs']: {
    module: { ExportExtension },
    path: { Builder: Path },
    fs: {
      promises: {
        Exists 
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
async function findRoot(file) {
  var dir = Path.Cwd.to(this)
  
  while (dir) {
    var path = dir.to(file)
    if (await path[Exists]())
      return path

    var dir = dir.dir
  }
}

module[ExportExtension](Path, findRoot)