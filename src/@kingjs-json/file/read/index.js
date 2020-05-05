var {
  fs,
  ['@kingjs']: { 
    module: {
      ExportExtension,
    },
    Path,
    fs: { 
      promises: { 
        Exists,
        file: { 
          Read: ReadFile 
        }
      },
    },
  },
} = module[require('@kingjs-module/dependencies')]()

async function readJsonFile() {
  if (await this[Exists]() == false)
    return

  var json = await this[ReadFile]()
  var pojo = JSON.parse(json)
  return pojo
}

module[ExportExtension](Path.Builder, readJsonFile)