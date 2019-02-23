var { 
  assert, fs, path, http, crypto,
  rxjs: { Subject },
  unzipper,
} = require('./dependencies');

process.chdir('.test');

var cwd = process.cwd();
var target = path.join(cwd, 'unzip');

fs.createReadStream('test.zip')
  .pipe(unzipper.Extract({ path: target }))
  .on('close', () => log('done'));
return;

var { promises: fsPromises } = fs;
var WithFileTypes = { withFileTypes: true };
var Encoding = { encoding: 'utf8' }

var HttpOkStatus = 200;
var OneSecond = 1000;
var LogFrequency = 1;
var Sha256 = 'sha256';
var Hex = 'hex';
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

function log() {
  console.log.apply(this, arguments);
}

async function logger() {  
  setTimeout(() => {
    for (var pointer of pointers) {
      if ('downloaded' in pointer)
        log(`${pointer.compressedSize}/${pointer.downloaded}`)
    }
    logger();
  }, OneSecond / LogFrequency)
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
  logger();
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
  pointers.push(pointer);

  if (!pointer.hash) {
    var subject = new Subject();
    var observable = subject;
    var observer = subject;

    await Promise.all([
      streamCounter.call(observable, pointer, 'downloaded'),
      streamHasher.call(observable, pointer, 'hash'),
      streamFile.call(observer, pointer, 'compressedSize', pointer.url)
    ]);

    log(pointer);
  }

  try {
    var exists = await fsPromises.access(pointer.target);
  } catch(e) { 
  }

  return pointer;
}

function streamCounter(target, name) {
  var observable = this;
  var count = 0;

  return new Promise(function(resolve) {
    observable.subscribe({
      next(o) { 
        count += o.length;
        target[name] = count;
      },
      complete() {
        delete target[name];
        resolve(count);
      }
    })
  })
}

function streamHasher(target, name) {
  var observable = this;
  var hasher = crypto.createHash(Sha256);

  return new Promise(function(resolve, reject) {
    observable.subscribe({
      next(o) { 
        hasher.update(o) 
      },
      complete() {
        hasher.end();
        target[name] = hasher.read().toString(Hex);
        resolve()
      }
    })
  });
}

function streamFile(target, name, url) {
  var observer = this;
  var next = observer.next.bind(this);

  return new Promise(function(resolve, reject) {
    var error = o => { observer.error(o); reject(o); }
    var complete = () => { observer.complete(); resolve(); }

    http.get(url, (response) => {

      // report error
      let error;
      if (response.statusCode !== HttpOkStatus) {
        response.resume();
        return error(`error on server: ${statusCode}: ${url}`);
      }

      // report length
      var contentLength = response.headers['content-length'];
      var length = contentLength ? Number(contentLength) : undefined;
      target[name] = length;

      // report data
      response.on('data', next);
      response.on('end', () => {
        if (!response.complete)
          return error(`error during download: ${url}`);
        complete();
      });
    }).on('error', () => error(`error on connect: ${url}`));
  })
}

module.exports = execute;

execute().then();