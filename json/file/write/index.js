var {
  fs,
  '@kingjs': {
    json: {
      stringify
    }
  }
} = require('./dependencies')

async function writeJsonFile(path, pojo) {
  var json = stringify(pojo)
  await fs.promises.writeFile(path, json)
}

module.exports = writeJsonFile