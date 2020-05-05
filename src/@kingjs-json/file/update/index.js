var {
  '@kingjs': {
    module: {
      ExportExtension,
    },
    Path,
    json: {
      file: {
        read: ReadJsonFile,
        write: WriteJsonFile,
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

async function updateJsonFile(pojo) {
  var json = await this[ReadJsonFile]() || { }
  var newJson = { ...json, ...pojo }
  await this[WriteJsonFile](newJson)
}

module[ExportExtension](Path.Builder, updateJsonFile)