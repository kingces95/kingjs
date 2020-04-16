var {
  '@kingjs': {
    module: {
      ExportExtension,
    },
    path: {
      Builder: Path,
    },
    json: {
      file: {
        read: ReadJsonFile,
        write: WriteJsonFile,
      }
    }
  }
} = require('./dependencies')

async function updateJsonFile(pojo) {
  var json = await this[ReadJsonFile]() || { }
  var newJson = { ...json, ...pojo }
  await this[WriteJsonFile](newJson)
}

module[ExportExtension](Path, updateJsonFile)