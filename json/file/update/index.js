var {
  '@kingjs': {
    json: {
      file: {
        read: readJsonFile,
        write: writeJsonFile,
      }
    }
  }
} = require('./dependencies')

async function updateJsonFile(path, pojo) {
  var json = await readJsonFile(path) || { }
  var newJson = { ...json, ...pojo }
  await writeJsonFile(path, newJson)
}

module.exports = updateJsonFile