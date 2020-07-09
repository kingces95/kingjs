var {
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-fs': { Exists,
      '-promises': {
        '-file': { Read: ReadFile }
      },
    },
  },
} = module[require('@kingjs-module/dependencies')]()

var Options = { async: true }

async function readJsonFile() {
  if (await this[Exists](Options) == false)
    return

  var json = await this[ReadFile]()
  var pojo = JSON.parse(json)
  return pojo
}

module[ExportExtension](Path.Builder, readJsonFile)