var { 
  '@kingjs': {
    path: {
      Builder: Path
    },
    run,
    fs: {
      promises: {
        ReadFile, 
        WriteFile, 
        List, 
        MakeDir, 
        CopyFile
      }
    },
    defineExtension
  }
} = require('./dependencies')

var { name, version } = require('./package.json');

var UTF8 = 'UTF8'
var WithFileTypes = { withFileTypes: true }
var EmptyArray = []

/**
 * @description The description.
 * 
 * @this any `this` comment.
 * 
 * @param foo `foo` comment.
 * 
 * @returns Returns comment.
 */
async function* copyDirGenerator(target, map) {

  // map target directory name
  if (map) {
    var { name } = map({ 
      path: this, 
      name: target.name, 
      isDirectory: true 
    })

    target = target.dir.to(name)
  }

  // make directory
  await target[MakeDir]()

  // list source content
  var { 
    files = EmptyArray,
    directories = EmptyArray
  } = await this[List](WithFileTypes)

  // copy sub-directories in parallel
  for (var dir of directories)
    yield copyDirGenerator.call(dir, target.to(dir.name), map)

  // copy files
  for (var file of files) {

    // map source file name and text
    if (map) {
      var text = await file[ReadFile](UTF8)
      var { text, name } = map({ 
        path: file, 
        name: file.name, 
        text, 
        isFile: true 
      })
      await target.to(name)[WriteFile](text)
      continue
    }

    // copy file without mapping
    await file[CopyFile](target.to(file.name))
  }
}

module.exports = defineExtension(
  Path.prototype, name, version, function copyDir(target, map) {
    return run(copyDirGenerator.call(this, target, map))
  }
)