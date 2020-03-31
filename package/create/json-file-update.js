var {
  fs,
} = require('./dependencies')

var readJsonFile = require('./json-file-read')

async function updateJsonFile(path, pojo) {
  var json = await readJsonFile(path) || { }
  var newJson = { ...json, ...pojo }
  await writeJsonFile(path, newJson)
}

function stringify(pojo) {
  return JSON.stringify(pojo, null, 2)
}

async function writeJsonFile(path, pojo) {
  var json = stringify(pojo)
  await fs.promises.writeFile(path, json)
}

module.exports = updateJsonFile