var {
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-json-file': { Read, Write }
  }
} = module[require('@kingjs-module/dependencies')]()

async function updateJsonFile(pojo) {
  var json = await this[Read]() || { }
  var newJson = { ...json, ...pojo }
  await this[Write](newJson)
}

module[ExportExtension](Path.Builder, updateJsonFile)