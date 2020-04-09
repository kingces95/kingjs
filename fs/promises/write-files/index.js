var { 
  fs: { promises: fs },
  path: Path,
  '@kingjs': {
    reflect: {
      is
    },
    json: { 
      stringify 
    }
  }
} = require('./dependencies')

var Recursive = { recursive: true }
var DotJson = '.json'

/**
 * @description Given a pojo, write files by interpret names without 
 * `.` as directories and otherwise files names whose value is content.
 * 
 * @param foo `foo` comment.
 * 
 * @returns Returns comment.
 */
async function writeFiles(path = process.cwd(), pojo) {
  await fs.mkdir(path, Recursive)

  for (var name in pojo) {
    var value = pojo[name]

    var ext = Path.extname(name)
    if (ext == DotJson)
      value = stringify(value)

    if (is.string(value)) {
      await fs.writeFile(Path.join(path, name), value)
      continue
    }
      
    await writeFiles(Path.join(path, name), value)
  }
}

module.exports = writeFiles