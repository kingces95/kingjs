var {
  fs,
  ['@kingjs']: { 
    fs: { promises: { exists } },
  },
} = require('./dependencies')

async function readJsonFile(path) {
  if (await exists(path) == false)
    return

  var json = await fs.promises.readFile(path)
  var pojo = JSON.parse(json)
  return pojo
}

module.exports = readJsonFile