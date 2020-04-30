var { 
  '@kingjs': {
    fs: {
      promises: {
        file: {
          Read: ReadFile
        },
        dir: {
          List
        }
      }
    },
    Path,
    module: { ExportExtension }
  }  
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
async function load() {
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

    pojo[name] = await load.call(this.to(name))
  }

  return pojo
}

module[ExportExtension](Path.Builder, load)