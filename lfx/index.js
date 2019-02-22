var { 
  assert, fs, path, util, http,
  request
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

var prototype = Object.getPrototypeOf((async function* () { })());
prototype = Object.getPrototypeOf(prototype);
var AsyncGenerator = function() { };
AsyncGenerator.prototype = prototype;

var pointers = [];

var count = 0;
async function log() {  
  setTimeout(() => {
    if (pointers.length > count) {
      count = pointers.length;
      console.log(pointers);
    }
    log();
  })
}

function start(task) {
  if (task === undefined)
    return;

  if (task instanceof Promise)
    return setTimeout(async () => { start(await task) });
  
  if (task instanceof Array)
    return task.forEach(o => start(o));

  if (task instanceof AsyncGenerator)
    return setTimeout(async () => { for await (var o of task) { start(o) } });

  assert.fail();
}

/**
 * @description The description.
 */
async function execute() {
  log();
  start(sync(pwd));
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

  var response = await curl(pointer.url);

  pointers.push(pointer);

  http.get(pointer.url, x => {
    return;
  })

  try {
    var exists = await fsPromises.access(pointer.target);
  } catch(e) { 
  }

  return pointer;
}


function curl(url) {
  return new Promise(function(resolve, reject) {

    var compressedSubTotal = 0;
    request({ 
      method: 'GET', 
      uri: url,
      //gzip: true,
    }, function (error, response, body) {
        // body is the decompressed response body
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
        //console.log('the decoded data is: ' + body)
        resolve();
      }
    )
    .on('data', function(data) {
      // decompressed data as it is received
      //console.log('decoded chunk: ' + data)
      compressedSubTotal += data.length;
    })
    .on('response', function(response) {
      var total = Number(response.headers['content-length']);
      console.log(`${total} bytes of compressed data expected.`)
      var subTotal = 0;

      // unmodified http.IncomingMessage object
      response.on('data', function(data) {
        // compressed data as it is received
        subTotal += data.length;
        var percentage = Math.round(subTotal / total * 100);
        console.log(`${percentage}%, received ${subTotal.toLocaleString()}/${compressedSubTotal.toLocaleString()}.`)
      })
    })
  });
}

module.exports = execute;