var { 
  assert, fs, http, crypto, zlib, os,
  fs, fs: { promises: fsPromises },
  path: Path, url: Url,
  rxjs: { Subject }
} = require('./dependencies');

var AsyncGenerator = require('./async-generator.js');

/// debug
process.chdir('.test/.lfx');
/// debug

var WithFileTypes = { withFileTypes: true };
var Encoding = { encoding: 'utf8' }

var OneMeg = 1 << 20;
var EmptyBuffer = Buffer.alloc(0);
var HttpOkStatus = 200;
var OneSecond = 1000;
var LogFrequency = 1;
var Sha256 = 'sha256';
var Hex = 'hex';
var Dot = '.';
var DotJson = Dot + 'json';
var Compressed = 'compressed';
var Decompressed = 'decompressed';

var MkdirRecursive = { recursive: true };

var DirNames = {
  target: '.target',
  staging: '.staging',
  get compressedStaging() { return Path.join(DirNames.cache, Compressed); },
  get decompressedStaging() { return Path.join(DirNames.cache, Decompressed); },

  cache: '.cache',
  get compressed() { return Path.join(DirNames.cache, Compressed); },
  get decompressed() { return Path.join(DirNames.cache, Decompressed); },
}

var Dirs = {
  get target() { return mkdir(DirNames.target); },
  get staging() { return mkdir(DirNames.staging); },
  get compressedStaging() { return mkdir(DirNames.compressedStaging); },
  get decompressedStaging() { return mkdir(DirNames.decompressedStaging); },

  get cache() { return mkdir(DirNames.cache); },
  get compressed() { return mkdir(DirNames.compressed); },
  get decompressed() { return mkdir(DirNames.decompressed); },
}

var infos = [];

function log() {
  console.log.apply(this, arguments);
}

async function mkdir(path) {
  await fsPromises.mkdir(path, MkdirRecursive);
  return path;
}

async function logger() {  
  setTimeout(() => {
    for (var info of infos) {
      if ('downloadedLength' in info) {
        if ('contentLength' in info) {
          var percent = info.downloadedLength / info.contentLength;
          log(`${Math.round(percent * 100)}% ${info.url}`)
        }
        else {
          var megs = info.downloadedLength / OneMeg;
          log(`${megs.toFixed(1)} (Mb)  ${info.url}`)
        }
      }
    }
    logger();
  }, OneSecond / LogFrequency)
}

function start(task) {
  if (task === undefined)
    return;

  if (task instanceof Promise) {
    return process.nextTick(async () => { 
      start(await task) 
    });
  }
  
  if (task instanceof Array)
    return task.forEach(o => start(o));

  if (task instanceof AsyncGenerator) {
    return process.nextTick(async () => { 
      for await (var o of task) { 
        start(o) 
      } 
    });
  }

  assert.fail();
}

/**
 * @description The description.
 */
async function execute() {
  logger();
  start(sync(Dot));
}

async function* sync(source) {
  var entries = await fsPromises.readdir(source, WithFileTypes);

  for (var entry of entries) {
    var entryPath = Path.join(source, entry.name);

    if (entry.isDirectory()) {
      if (entry.name[0] == Dot)
        continue;

      yield sync(entryPath);
      continue;
    }

    yield [ link(entryPath) ];
  }
}

async function link(infoFile) {
  var info = await decompress(infoFile);
}

async function decompress(infoFile) {
  var info = await download(infoFile);
  return info;
}

async function download(infoFile) {
  var subject = new Subject();
  var observable = subject;
  var observer = subject;

  try {
    var json = await fsPromises.readFile(infoFile, Encoding);
    var info = {
      source: infoFile,
      target: Path.join(await Dirs.target, Path.basename(infoFile, DotJson)),
      ...JSON.parse(json)
    };
    infos.push(info);

    if (!info.hash) {

      // create staging dir/path to save compressed file
      var url = Url.parse(info.url);
      info.ext = Path.extname(url.pathname);
      info.compressedStaging = Path.join(await Dirs.compressedStaging, url.pathname);
      info.decompressedStaging = Path.join(await Dirs.decompressedStaging, url.pathname);
      await mkdir(Path.dirname(info.download));

      // while streaming: save to disk, decompress, compute hash, report progress
      info.backPressure = [];
      observable[Write](info, 'compressedStaging', 'backPressure');
      observable[Decompress](info, 'decompressedStaging', 'backPressure');
      observable[Hash](info, 'hash');
      observable[Count](info, 'downloadedLength');

      // start stream and observe incoming chunks
      var remoteFile = await get(info, 'contentLength', info.url);
      for await (var data of remoteFile) {
        observer.next(data);
        if (info.backPressure.length)
          await Promise.all(...info.backPressure);
      }
      observer.complete();

      try {
        // publish downloaded compressed file to cache
        info.compressed = Path.join(await Dirs.compressed, info.hash + info.ext);
        await fsPromises.rename(info.download, info.compressed);
      } catch(e) { log(e); /* ignore races to publish compressed files */ }
    }

    log(info);
    return info;

    // var exists = yield fsPromises.access(info.target);
  } 
  catch(e) {
    log(e);
    info.error = e;
    observer.error(e);
  } 
}

var Decompress = Symbol('@kingjs/Observable.stream.decompress');
Subject.prototype[Decompress] = async function(target, name, backPressure) {

  this.subscribe({
    next(o) { 
      if (!stream.write(o))
        target[backPressure].add(flush(stream));
    },
    complete() {
      delete target[backPressure]
    }
  })
}

var Write = Symbol('@kingjs/Observable.stream.write');
Subject.prototype[Write] = async function(target, name, backPressure) {
  var stream = fs.createWriteStream(target[name])

  this.subscribe({
    next(o) { 
      if (!stream.write(o))
        target[backPressure].add(flush(stream));
    },
    complete() {
      delete target[backPressure]
    }
  })
}

var Count = Symbol('@kingjs/Observable.stream.count');
Subject.prototype[Count] = function(target, name) {
  var count = 0;

  this.subscribe(o => { 
    count += o.length;
    target[name] = count;
  })
}

var Hash = Symbol('@kingjs/Observable.stream.hash');
Subject.prototype[Hash] = function(target, name) {
  var hash = crypto.createHash(Sha256);

  this.subscribe({
    next(o) { 
      hash.update(o) 
    },
    complete() {
      hash.end();
      target[name] = hash.digest(Hex);
    }
  })
}

function flush(stream) {
  return new Promise(function(resolve, reject) {
    stream
      .on('error', reject)
      .write(EmptyBuffer, () => {
        stream.off('error', reject)
        resolve();
      }
    );
  })
}

function get(target, name, url) {
  return new Promise(function(resolve, reject) {
    http.get(url, (response) => {

      // report error
      let error;
      if (response.statusCode !== HttpOkStatus) {
        response.resume();
        return error(`Server error ${statusCode}: ${url}`);
      }

      // report length
      var contentLength = response.headers['content-length'];
      if (contentLength)
        target[name] = Number(contentLength);

      resolve(response);

    }).on('error', () => reject(`error on connect: ${url}`));
  })
}

var log = console.log.bind(console);

module.exports = execute;

execute().then();