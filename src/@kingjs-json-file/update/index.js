var {
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-json-file': { Read, Overwrite }
  }
} = module[require('@kingjs-module/dependencies')]()

async function updateJsonFile(pojo) {
  var json = await this[Read]() || { }
  var newJson = { ...json, ...pojo }
  await this[Overwrite](newJson)
}

module[ExportExtension](Path.Builder, updateJsonFile)