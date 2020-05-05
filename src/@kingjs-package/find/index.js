var { 
  assert,
  '@kingjs': {
    run,
    Path,
    fs: { 
      promises: { dir: { List } }
    },
    module: { ExportExtension }
  }
} = require('./dependencies')

var EmptyArray = []
var options = { withFileTypes: true }
var PackageJson = 'package.json'
var NodeModule = 'node_module'
var Dot = '.'

/**
 * @description Find `package.json` in subdirectories.
 * 
 * @this Path The path to start searching for `package.json` files.
 * 
 * @returns Returns an asynchronous generator of paths to `package.json` files.
 * 
 * @remarks Directories beginning with `.` and named `node_module` are skipped.
 * @remarks Subdirectories of directories containing `package.json` are also skipped.
 */
async function find() {

  var result = []

  async function* traverse() {
    var dir = this
  
    var { 
      files = EmptyArray, 
      directories = EmptyArray
    } = await dir[List](options)
  
    for (var file of files) {
      var { name } = file

      if (name != PackageJson)
        continue

      // search no further sub-dirs after package.json is found
      result.push(dir)
      return
    }

    for (var dir of directories) {
      var { name } = dir
      
      // skip directories starting with '.'
      if (name[0] == Dot)
        continue

      // skip node_module directories
      if (name == NodeModule)
        continue

      yield traverse.call(dir)
    }
  }

  await run(traverse.call(this))

  return result
}

module[ExportExtension](Path.Builder, find)