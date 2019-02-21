var { 
  assert, fs, path: p, util
} = require('./dependencies');

var { promises: fsPromises } = fs;
var WithFileTypes = { withFileTypes: true }

var id = 0;
async function reportStatus(id) {
  console.log(id);

  var count = 0;
  while (count++ < 5) {
    console.log(id, await count);
    await yieldPromise();
  }

  return id;
}

function yieldPromise() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), 100);
  });
}

/**
 * @description The description.
 */
async function* execute(source, target) {
  var entries = await fsPromises.readdir(source, WithFileTypes);

  for (var entry of entries) {
    var path = p.join(source, entry.name);

    if (entry.isDirectory()) {
      yield execute(path, target);
      continue;
    }

    yield path;
  }
}

async function readJson(path) {
  var file = await fsPromises.readFile(path);
  return JSON.parse(file); 
}

module.exports = execute;