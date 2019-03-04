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
var crc = require('./crc');

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

/**
 * path - path to info file
 * source - path at which decompressed file is made available via link
 * target - path at which decompressed file is published
 * cache - path at which compressed file is published
 * decompressedStaging - temp path to decompress file into before publishing to source
 * compressedStaging {promise} temp path to download file into before publishing to cache
 * url - compressed file url
 * contentLength - compressed file size
 * downloadedLength - compressed bytes downloaded
 * hash - MD5 hash of compressed file
 */
class Info {
  static async create(path) {
    var source = await mkdir(Path.join(await Dirs.target, Path.basename(path, DotJson)));
    var json = JSON.parse(await fsPromises.readFile(path, Encoding));
    return new Info(path, source, json);
  }

  constructor(path, source, json) {
    infos.push(this);

    this.path = path;
    this.source = source;
    for (var name in json)
      this[name] = json[name];
  }
  get name() { 
    if (!this.url)
      return;
    return Url.parse(this.url).pathname;
  }
  async compressedStaging() { 
    if (!this.name)
      return;
    var baseDir = await Dirs.compressedStaging;
    return mkdir(Path.join(baseDir, this.name));
  }
  async decompressedStaging() { 
    if (!this.name)
      return;
    var baseDir = await Dirs.decompressedStaging;
    return mkdir(Path.join(baseDir, this.name));
  }
}

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
  try {
    var info = await Info.create(infoFile);

    if (!info.hash) {

      // start streaming zip file
      var deflateIn = await get(info.url, info, 'contentLength');

      // make incoming data chunks observable
      var backPressure = [];

      // while streaming: save to disk, decompress, compute hash, report progress
      var subject = new Subject();

      // save compressed file
      subject[Write](fs.createWriteStream(await info.compressedStaging()), backPressure);

      // decompressed file on the fly
      var inflate = subject[Unzip](await info.decompressedStaging(), backPressure);

      subject[SubscribeProperties](info, {
        // report bytes downloaded so far after every chunk
        [Count]: 'downloadedLength',

        // stream bytes into hasher to create the identifier for cached files
        [Hash]: 'hash',
      });

      // observe incoming chunks
      await deflateIn[Subscribe](subject, backPressure)

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

var Unzip = Symbol('@kingjs/stream.unzip');

var Subscribe = Symbol('@kingjs/stream.subscribe');
Object.prototype[Subscribe] = function(observer, backPressure) {
  var stream = this;
  if (!backPressure)
    backPressure = EmptyArray;

  return new Promise(function(resolve, reject) {
    stream
      .on('error', o => {
        observer.error(o);
        reject(o);
      })
      .on('data', data => {
        observer.next(data);
        if (!backPressure.length) 
          return;
          
        stream.pause();
        Promise.all(backPressure).then(() => stream.resume())
        backPressure.length = 0;
      })
      .on('end', () => {
        observer.complete();
        resolve();
      });
  });
}

var SubscribeProperties = Symbol('@kingjs/Observable.subscribe-properties');
Object.prototype[SubscribeProperties] = function(target, descriptor) {
  for (var name in descriptor)
    this[name](target, name);
}

var Write = Symbol('@kingjs/Observable.write');
Object.prototype[Write] = function(stream, backPressure) {
  this[SubscribeIterator](write(), stream, backPressure);
}

var Hash = Symbol('@kingjs/Observable.hash');
Object.prototype[Hash] = function(observations, name) {
  this[SubscribeIterator](hash(), observations, name);
}

var Count = Symbol('@kingjs/Observable.count');
Object.prototype[Count] = function(observations, name) {
  this[SubscribeIterator](count(), observations, name);
}

var SubscribeIterator = Symbol('@kingjs/Observable.subscribe-iterator');
Object.prototype[SubscribeIterator] = function(iterator, observations, name) {
  var next = iterator.next();
  return this.subscribe({
    next: observe,
    complete: observe(null)
  })

  function observe(o) {
    if (next.done)
      return;
    next = iterator.next(o);

    if (!observations)
      return;
    observations[name] = next.value;
  }
}

function* unzip(dir, backPressure) {
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

    // make incoming data chunks observable
    var backPressure = [];
    var observable = inflate[subscribe](backPressure)

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
    
    observable[SubscribeIterator](write(stream, backPressure));
    observable[SubscribeIterator](count(), observations, 'compressedSize');

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

function inflate(observable, backPressure) {
  return new Observable(function(observer) {
    var inflate = zlib.createInflate();
    inflate.on('end', function() {
      observer.complete();
      backPressure.push(
        new Promise(function(resolve) {

        })
      )
    });

    observable.subscribe({
      next(o) { 
        inflate.on('data', function(chunk) {
          observer.next(chunk);
        })
      },
      complete() { 
        backPressure.push(

        );
      },
      error(o) { 
        inflate.destroy();
        observer.error(o);
      }
    })

    function complete() {
      observer.complete();
      new Promise(function(resolve) {
        inflate.on('close', resolve);
      })
    }
  });
}

function* write(stream, backPressure) {
  var buffer;

  while (buffer = yield) {
    if (!stream.write(buffer))
      backPressure.push(drain(stream));
  }

  backPressure.push(end(stream, buffer));
}

function* count() {
  var result = 0;

  var buffer;
  while (buffer = yield result)
    result += buffer.length;

  return result;
}

function* hash() {
  var hash = crypto.createHash(Sha256);

  while (buffer = yield)
    hash.update(buffer);
  hash.end();

  return hash.digest(Hex);
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

function get(url, target, name) {
  return new Promise(function(resolve, reject) {
    http.get(url, response => {

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

var log = console.log.bind(console);

module.exports = execute;

execute().then();