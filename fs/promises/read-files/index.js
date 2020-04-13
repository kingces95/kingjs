var { 
  '@kingjs': {
    fs: {
      promises: {
        ReadFile,
        List
      }
    },
    path: {
      Builder: Path
    },
    defineExtension
  }  
} = require('./dependencies')

var { name, version } = require('./package.json');

var Utf8 = 'utf8'
var DotJson = '.json'

/**
 * @description Build a pojo of simple directory names and text files.
 * 
 * @param path The path of simple directory names and text files.
 * 
 * @returns Returns a pojo representing directories and files.
 */
async function readFiles() {
  var pojo = { }

  for (var entry of await this[List]()) {
    var { name, ext } = entry

    if (ext) {
      var value = await this.to(name)[ReadFile](Utf8)

      if (ext == DotJson)
        value = JSON.parse(value)

      pojo[name] = value
      continue
    }

    pojo[name] = await readFiles.call(this.to(name))
  }

  return pojo
}

module.exports = defineExtension(
  Path.prototype, name, version, readFiles
)