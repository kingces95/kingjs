var { 
  '@kingjs': { Path, run,
    '-fs-promises': {
      '-file': { 
        Read: ReadFile,
        Write: WriteFile,
        Copy: CopyFile
      },
      '-dir': {
        Make: MakeDir,
        List
      },
    },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var UTF8 = 'UTF8'
var WithFileTypes = { withFileTypes: true }
var EmptyArray = []

/**
 * @description Copies a directory's files and sub-directories in parallel.
 * 
 * @this any The source directory path.
 * 
 * @param target The target directory path.
 * @param [map] Optional mapping function for mapping names and file text.
 * 
 * @remarks The target directory is created if it does not exist.
 */
async function* copyDirGenerator(target, map) {

  // make directory
  await target[MakeDir]()

  // list source content
  var { 
    files = EmptyArray,
    directories = EmptyArray
  } = await this[List](WithFileTypes)

  // process directories
  for (var dir of directories) {
    var { name } = dir

    // map target directory name
    if (map) {
      var { name } = map({ 
        path: this, 
        name: dir.name, 
        isDirectory: true 
      })
    }

    // copy sub-directories in parallel
    yield copyDirGenerator.call(dir, target.to(name), map)
  }

  // process files
  for (var file of files) {

    // map source file
    if (map) {
      var text = await file[ReadFile](UTF8)
      var { text, name } = map({ 
        path: file, 
        name: file.name, 
        text, 
        isFile: true 
      })

      // write mapped file
      await target.to(name)[WriteFile](text)
      continue
    }

    // copy file without mapping
    await file[CopyFile](target.to(file.name))
  }
}

module[ExportExtension](Path.Builder, function copyDir(target, map) {
  return run(copyDirGenerator.call(this, target, map))
})