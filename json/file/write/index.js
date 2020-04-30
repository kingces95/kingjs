var {
  fs,
  '@kingjs': {
    module: {
      ExportExtension
    },
    Path,
    fs: {
      promises: {
        file: { 
          Write: WriteFile 
        }
      }
    },
    json: {
      stringify
    }
  }
} = require('./dependencies')

async function writeJsonFile(pojo) {
  var json = stringify(pojo)
  await this[WriteFile](json)
}

module[ExportExtension](Path.Builder, writeJsonFile)