var {
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-fs-promises-file': { Write: WriteFile },
    '-json': { stringify },
  }
} = module[require('@kingjs-module/dependencies')]()

async function writeJsonFile(pojo) {
  var json = stringify(pojo)
  await this[WriteFile](json)
}

module[ExportExtension](Path.Builder, writeJsonFile)