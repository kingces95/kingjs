var { 
  fs: { promises: fs },
  path: Path
} = require('./dependencies')

var Utf8 = 'utf8'
var DotJson = '.json'

/**
 * @description Build a pojo of simple directory names and text files.
 * 
 * @param path The path of simple directory names and text files.
 * 
 * @returns Returns a pojo representing directories and files.
 */
async function readFiles(path = process.cwd()) {
  var pojo = { }

  for (var name of await fs.readdir(path)) {

    var ext = Path.extname(name)
    if (ext) {
      var value = await fs.readFile(Path.join(path, name), Utf8)

      if (ext == DotJson)
        value = JSON.parse(value)
      
      pojo[name] = value
      continue
    }

    pojo[name] = await readFiles(Path.join(path, name))
  }

  return pojo
}

module.exports = readFiles