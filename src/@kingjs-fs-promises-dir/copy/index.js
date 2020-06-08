var { 
  '@kingjs': { Path, run,
    '-fs': {
      '-dir': {
        Partition,
      },
      '-promises': {
        '-file': { 
          Read: ReadFile,
          Write: WriteFile,
          Copy: CopyFile
        },
        '-dir': {
          List,
          Make: MakeDir,
        },
      },
    },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var UTF8 = 'UTF8'
var WithFileTypes = { withFileTypes: true }
var EmptyArray = []
var Identity = o => o

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
async function* copyDirGenerator(target, map = Identity) {

  // make directory
  await target[MakeDir]()

  // list source content
  var { 
    files = EmptyArray,
    directories = EmptyArray
  } = (await this[List](WithFileTypes))
    [Partition]()

  // process directories
  for (var subDirectory of directories) {

    // map target directory name
    if (map) {
      var { name } = map({ 
        path: this, 
        name: subDirectory, 
        isDirectory: true 
      })
    }

    // copy sub-directories in parallel
    yield copyDirGenerator.call(this.to(subDirectory), target.to(name), map)
  }

  // process files
  for (var file of files) {
    var filePath = this.to(file)

    // map source file
    if (map) {
      var text = await filePath[ReadFile](UTF8)
      var { text, name } = map({ 
        path: filePath, 
        name: file, 
        text, 
        isFile: true 
      })

      // write mapped file
      await target.to(name)[WriteFile](text)
      continue
    }

    // copy file without mapping
    await filePath[CopyFile](target.to(file))
  }
}

module[ExportExtension](Path.Builder, function copyDir(target, map) {
  return run(copyDirGenerator.call(this, target, map))
})