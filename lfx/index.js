var { 
  assert, fs, path, util
} = require('./dependencies');

var { promises: fsPromises } = fs;
var WithFileTypes = { withFileTypes: true };
var Encoding = { encoding: 'utf8' }

var DotJson = '.json';
var CacheDirName = '.cache';
var StagedDirName = 'staged';

var pwd = process.cwd();

var CacheDir = path.join(pwd, CacheDirName);
var StagedDirName = path.join(CacheDir, StagedDirName);
var TargetRootDir = path.join(pwd, "../bin");

var heap = [];
var pointers = [];

/**
 * @description The description.
 */
async function execute() {
  heap.push(sync(pwd));

  while (heap.length) {

    var all = [];
    for (var item of heap) {
      if (item instanceof Promise)
        all.push(item)

      else {
        var next = item.next();
        if (next.done)
          item.done = true;
        else if (next instanceof Promise) {
          if (next.value)
            item.done = true;
          else
            all.push(next);
        }
        else if (next.value instanceof Promise)
          all.push(next.value);
      }
    }

    heap = heap.filter(o => !o.done);

    var { value, done } = await Promise.race(all);
    if (done)
      continue;

    if (Symbol.iterator in value)
      value = value[Symbol.iterator]();
    heap.push(value);
  }
}

async function* sync(source) {
  var entries = await fsPromises.readdir(source, WithFileTypes);

  for (var entry of entries) {
    var entryPath = path.join(source, entry.name);

    if (entry.isDirectory()) {
      yield sync(entryPath);
      continue;
    }

    yield [ link(entryPath) ];
  }
}

async function link(pointerFile) {
  var pointer = await decompress(pointerFile);
  return pointer;
}

async function decompress(pointerFile) {
  var pointer = await download(pointerFile);
  return pointer;
}

async function download(pointerFile) {
  var json = await fsPromises.readFile(pointerFile, Encoding);
  var pointer = {
    source: pointerFile,
    target: path.join(TargetRootDir, path.basename(pointerFile, DotJson)),
    ...JSON.parse(json)
  };

  try {
    console.log('pointerFile', pointerFile);
    var exists = await fsPromises.access(pointer.target);
  } catch(e) { 
  }

  await pause();
  return pointer;
}

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

function pause() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), 1000);
  });
}

module.exports = execute;