var {
  fs,
  ['@kingjs']: { 
    module: {
      ExportExtension,
    },
    path: {
      Builder: Path,
    },
    fs: { 
      promises: { 
        Exists,
        file: { 
          Read: ReadFile 
        }
      },
    },
  },
} = require('./dependencies')

async function readJsonFile() {
  if (await this[Exists]() == false)
    return

  var json = await this[ReadFile]()
  var pojo = JSON.parse(json)
  return pojo
}

module[ExportExtension](Path, readJsonFile)