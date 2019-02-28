var { 
  assert, fs, http, crypto, zlib, os,
  fs, fs: { promises: fsPromises },
  path: Path, url: Url,
  rxjs: { Subject },
  ['@kingjs']: { reflect: { is } },
} = require('./dependencies');

var AsyncGenerator = require('./async-generator');
var deserialize = require('./deserialize');
var LocalFileHeader = require('./zip/local-file-header');
var DataDescriptor = require('./zip/data-descriptor');

/// debug
process.chdir('.test/.lfx');
/// debug

var WithFileTypes = { withFileTypes: true };
var Encoding = { encoding: 'utf8' }

var EmptyObject = { };
var EmptyArray = [ ];
var DataFileSignature = 0x08074b50;
var MaxNumber = Number.MAX_SAFE_INTEGER;
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

      // create staging directories
      var url = Url.parse(info.url);
      info.compressedStaging = Path.join(await Dirs.compressedStaging, url.pathname);
      info.decompressedStaging = Path.join(await Dirs.decompressedStaging, url.pathname);
      await mkdir(Path.dirname(info.compressedStaging));

      var compressedStagingStream = fs.createWriteStream(info.compressedStaging)

      // while streaming: save to disk, decompress, compute hash, report progress
      var backPressure = [];
      observable[SubscribeIterator](write(compressedStagingStream, backPressure));
      observable[SubscribeIterator](unzip(info.decompressedStaging, backPressure));
      observable[SubscribeIterator](count(info, 'downloadedLength'));
      observable[SubscribeIterator](hash(info, 'hash'));

      // start stream and observe incoming chunks
      var remoteFile = await get(info, 'contentLength', info.url);
      for await (var data of remoteFile) {
        observer.next(data);
        if (backPressure.length) {
          await Promise.all(backPressure);
          backPressure.length = 0;
        }
      }
      observer.complete();

      try {
        // publish downloaded compressed file to cache
        info.ext = Path.extname(url.pathname);
        info.compressed = Path.join(await Dirs.compressed, info.hash + info.ext);
        await fsPromises.rename(info.download, info.compressed);
      } catch(e) { 
        log(infoFile, e); /* ignore races to publish compressed files */ 
      }
    }

    log(info);
    return info;

    // var exists = yield fsPromises.access(info.target);
  } 
  catch(e) {
    log(infoFile, e);
    if (info)
      info.error = e;
    observer.error(e);
  } 
}

var SubscribeIterator = Symbol('@kingjs/Observable.subscribe-iterator');
Object.prototype[SubscribeIterator] = async function(iterator, observations, name) {
  var next = iterator.next();
  return this.subscribe({
    next: observe,
    complete: observe(null)
  })

  function observe(o) {
    if (next.done)
      return;

    next = iterator.next(o);
    observations[name] = next.value;
  }
}

function take(observable, length) {
  return new Observable(observer => {
    observable[SubscribeIterator](
      function* () {
        var remaining = length;

        while (remaining) {
          var buffer = yield;

          if (!buffer) {
            buffer = EmptyBuffer;
            remaining = 0;
          }

          if (buffer.length >= remaining) {
            if (remaining) {
              buffer = buffer.slice(remaining);
              observer.push(buffer);
            }

            observer.complete();
            return;
          }

          remaining -= buffer.length;
          observer.next(buffer);
        }
      }
    )
  })
}

function* unzip(dir, backPressure) {
  var inflate = zlib.createInflate();

  var buffer;

  while (true) {
    var header = { };
    buffer = yield* deserialize(buffer, header, LocalFileHeader);

    var path = Path.join(dir, header.fileName);
    fs.mkdirSync(Path.dirname(path), MkdirRecursive);

    var isCompressed = header.compression != 'noCompression';
    var isDirectory = !isCompressed && !header.uncompressedSize;
    var hasDataDescriptor = header.hasDataDescriptor;

    if (isDirectory) {
      fs.mkdirSync(Path.basename(path), MkdirRecursive);
      continue;
    } 

    var stream = fs.createWriteStream(path)

    if (isCompressed) {
      stream = inflate.pipe(stream);
      var options = hasDataDescriptor ? 
        { magic : DataFileSignature } : 
        { length: header.compressedSize };
    }

    var subject = new Subject();

    var observations = { };
    var observable = subject;
    
    observable[SubscribeIterator](write(stream, backPressure, options));
    observable[SubscribeIterator](count(observations, 'compressedSize'));

    var observer = subject;
    while (!options.remainder)
      observer.next(buffer || (yield));
    observer.complete();
    buffer = options.remainder;
    var compressedSize = observations.compressedSize - buffer.length;

    if (hasDataDescriptor)
      buffer = yield* deserialize(buffer, header, DataDescriptor);
    assert(compressedSize == header.compressedSize);
  }
}

function* write(stream, backPressure) {
  var buffer;

  while (buffer = yield) {
    if (!stream.write(buffer))
      backPressure.push(drain(stream));
  }

  backPressure.push(end(stream, buffer));
}

function* count(observations, name) {
  observations[name] = 0;

  while (buffer = yield)
    observations[name] += buffer.length;
}

function* hash(observations, name) {
  var hash = crypto.createHash(Sha256);

  while (buffer = yield)
    hash.update(buffer);
  hash.end();

  observations[name] = hash.digest(Hex);
}

function end(stream, buffer) {
  return new Promise(function(resolve, reject) {
    stream
      .on('error', reject)
      .end(buffer, resolve);
  });
}

function drain(stream) {
  return new Promise(function(resolve, reject) {
    stream
      .on('error', reject)
      .write(EmptyBuffer, o => {
        stream.off('error', reject(o))
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