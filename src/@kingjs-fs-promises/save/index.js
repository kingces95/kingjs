var { assert,
  '@kingjs': { Path,
    '-fs-promises': {
      '-dir': { Make, Write, SymlinkTo },
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
    await this[Make]()

    for (var name in dir) {
      var entry = dir[name]

      // create file
      if (await saveEntry.call(this, name, entry))
        continue

      await saveDir.call(this.to(name), entry)
    }
  }
}

async function saveEntry(name, entry) {
  var path = this.to(name)

  // entries with '.json' are stringified
  if (path.ext == DotJson)
    entry = stringify(entry)

  if (!is.string(entry))
    return false

  // create symlink file
  var match = /^(file|dir):(.*)/.exec(entry)
  if (match) {
    var isFile = match[1] == 'file'
    var targetPath = this.to(Path.parse(match[2]))
    var targetDir = isFile ? targetPath.dir : targetPath
    var targetName = isFile ? targetPath.name : null
    await this[SymlinkTo](name, targetDir, { name: targetName })
    return true
  }

  // write text to a file
  assert(is.string(entry))
  await this[Write](name, entry)
  return true
}

module[ExportExtension](Path.Builder, save)