var { 
  '@kingjs': {
    path: {
      Builder: Path
    },
    fs: {
      promises: {
        MakeDir,
        WriteFile
      }
    },
    reflect: { is },
    json: { stringify },
    defineExtension
  }
} = require('./dependencies')

var { name, version } = require('./package.json');

var DotJson = '.json'

/**
 * @description Given a pojo, write files by interpret names without 
 * `.` as directories and otherwise files names whose value is content.
 * 
 * @param foo `foo` comment.
 * 
 * @returns Returns comment.
 */
async function writeFiles(pojo) {
  await this[MakeDir]()

  for (var name in pojo) {
    var path = this.to(name)
    var value = pojo[name]

    var ext = Path.create(name).ext
    if (ext == DotJson)
      value = stringify(value)

    if (is.string(value)) {
      await path[WriteFile](value)
      continue
    }
      
    await writeFiles.call(path, value)
  }
}

module.exports = defineExtension(
  Path.prototype, name, version, writeFiles
)