var { assert,
  '@kingjs': { Path,
    '-fs-promises': {
      '-dir': { Make: MakeDir },
      '-file': { Write: WriteFile},
      '-link': { Write: LinkTo },
    },
    '-reflect': { is },
    '-json': { stringify },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var DotJson = '.json'

/**
 * @description Given a pojo, write files by interpret names without 
 * `.` as directories and otherwise files names whose value is content.
 * 
 * @param foo `foo` comment.
 * 
 * @returns Returns comment.
 */
async function save(pojo) {
  await saveDir.call(this, pojo, new Map())

  async function saveDir(dir) {

    // create directory
    await this[MakeDir]()

    for (var name in dir) {
      var entry = dir[name]
      var entryPath = this.to(name)

      // create file
      if (await saveEntry.call(entryPath, entry))
        continue

      await saveDir.call(entryPath, entry)
    }
  }
}

async function saveEntry(entry) {

  // entries with '.json' are stringified
  if (this.ext == DotJson)
    entry = stringify(entry)

  if (!is.string(entry))
    return false

  // create symlink file
  var match = /^(file|dir):(.*)/.exec(entry)
  if (match) {
    var isFile = match[1] == 'file'
    var target = this.dir.to(Path.parse(match[2]))
    await this[LinkTo](target, isFile)
    return true
  }

  // write text to a file
  assert(is.string(entry))
  await this[WriteFile](entry)
  return true
}

module[ExportExtension](Path.Builder, save)