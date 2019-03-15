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
var start = require('./start');

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

var nop = () => { };
var log = console.log.bind(console);

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
    var source = Path.join(DirNames.target, Path.basename(path, DotJson))
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
  get compressedStaging() { 
    if (!this.name)
      return;
    var baseDir = DirNames.compressedStaging;
    return Path.join(baseDir, this.name);
  }
  get decompressedStaging() { 
    if (!this.name)
      return;
    var baseDir = DirNames.decompressedStaging;
    return Path.join(baseDir, this.name);
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
          log(`${Math.round(percent * 100)}% ${info.url}`, info.unzip)
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

  if (task instanceof Function)
    return start(task());

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
      await mkdir(Path.dirname(info.compressedStaging));
      var compressedStream = fs.createWriteStream(info.compressedStaging);

      // while streaming: save to disk, decompress, compute hash, report progress
      var backPressure = [];
      var subject = new Subject();
      subject[SubscribeProperties](info, {

        // save compressed file
        compressedWritten: write(compressedStream, backPressure),

        // decompressed file on the fly
        unzip: unzip(info.decompressedStaging, backPressure),

        // report bytes downloaded so far after every chunk
        downloadedLength: count(),

        // stream bytes into hasher to create the identifier for cached files
        hash: hash(),
      });

      // start streaming zip file & observe incoming chunks
      var downloadStream = await get(info.url, info, 'contentLength');
      await downloadStream[Subscribe](subject, backPressure)

      try {
        // publish downloaded compressed file to cache
        info.ext = Path.extname(url.pathname);
        info.compressed = Path.join(DirsName.compressed, info.hash + info.ext);
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

function* unzip(dir, backPressure) {
  var buffer;

  while (true) {
    var header = { };
    buffer = yield* deserialize(buffer, header, LocalFileHeader);

    var path = Path.join(dir, header.fileName);
    log('inflating', path);
    var isCompressed = header.compression != 'noCompression';
    var isDirectory = !isCompressed && !header.uncompressedSize;
    var hasDataDescriptor = header.hasDataDescriptor;

    if (isDirectory) {
      assert(!hasDataDescriptor);
      continue;
    }

    assert(isCompressed);

    var error;
    var numberRead = 0;
    var observations = { };
    var inflateStream = zlib.createInflateRaw();

    start(async () => {
      try {
        await mkdir(Path.dirname(path));
        var decompressedStream = fs.createWriteStream(path);

        var subject = new Subject();
        subject[SubscribeProperties](observations, {

          // save compressed file
          decompressedWritten: write(decompressedStream, backPressure),

          // report bytes decompressed so far after every chunk
          decompressedCount: count(),

          complete: completed(),
        });

        // start streaming zip file & observe incoming chunks
        await inflateStream[Subscribe2](subject, backPressure);
      } 
      catch(e) { error = e }
    });

    var subject = new Subject();
    subject[SubscribeProperties](observations, {
      inflateStream: write2(inflateStream, backPressure),
      buffer: inflateWindow(inflateStream)
    });

    while(true) {
      if (buffer)
        subject.next(buffer);
        
      if (!buffer || observations.complete) {
        subject.complete();
        break;
      }

      buffer = yield observations;
    }

    // propagate error
    if (error) {
      subject.error();
      throw error;
    }

    buffer = observations.buffer;
    log('inflated', path);

    if (hasDataDescriptor)
      buffer = yield* deserialize(buffer, header, DataDescriptor);
    assert(inflateStream.bytesWritten == header.compressedSize);
  }
}

function* write2(stream, backPressure) {
  var buffer;

  while (buffer = yield) {
    if (!stream.write(buffer)) 
      backPressure.push(drain2(stream));
  }

  stream.end();
}

function* write(stream, backPressure) {
  var buffer;

  while (buffer = yield) {
    if (!stream.write(buffer)) 
      backPressure.push(drain(stream));
  }

  stream.end();
}

function* inflateWindow(stream) {
  var buffers = [];
  var totalBytesFlushed = 0;
  var bytesWritten = 0;

  var buffer;
  while (buffer = yield) {
    buffers.push(buffer);
    bytesWritten += buffer.length;
    assert(bytesWritten >= stream.bytesWritten);
 
    var bytesToFlush = stream.bytesWritten - totalBytesFlushed;
    while (bytesToFlush) {
      
      var bytesFlushed;
      if (buffers[0].length <= bytesToFlush) {
        bytesFlushed = buffers.shift(0).length;
      }
      else {
        buffers[0] = buffers[0].slice(bytesToFlush);
        bytesFlushed = bytesToFlush;
      }

      bytesToFlush -= bytesFlushed;
      assert(bytesToFlush >= 0);

      totalBytesFlushed += bytesFlushed;
      assert(totalBytesFlushed <= stream.bytesWritten);
    }
  }

  var tos = buffers[0];
  assert(stream.bytesWritten == totalBytesFlushed);
  return Buffer.concat(buffers);
}

function* completed() {
  while (yield false)
    ;

  log('observed completed')
  return true;
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

var i = 0;
function drain2(stream) {
  var id = i++;
  log('draining:', id)
  var resolved = false;
  setTimeout(() => {
    if (!resolved)
      log(id);
  }, 2000)
  return new Promise(function(resolve, reject) {
    var end = () => handler('end');
    var finish = () => handler('finish');
    var drain = () => handler('drain');
    var close = () => handler('close');

    var handler = (e) => {
      stream.off('error', reject)

      stream.off('end', end)
      stream.off('finish', finish)
      stream.off('drain', drain)
      stream.off('close', close)

      log('drained:', e, id);

      resolved = true;
      resolve();
    };

    stream
      .on('error', reject)
      .on('end', end)
      .on('finish', finish)
      .on('drain', drain)
      .on('close', close)
  })
}

function drain(stream) {
  return new Promise(function(resolve, reject) {
    stream
      .on('error', reject)
      .once('drain', () => {
        stream.off('error', reject)
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

var Subscribe2 = Symbol('@kingjs/stream.subscribe');
Object.prototype[Subscribe2] = function(observer, backPressure) {
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
        log('inflate end (eof)');
        //stream.destroy();
        resolve();
      });
  });
}

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
Object.prototype[SubscribeProperties] = function(observations, descriptor) {
  for (var name in descriptor)
    this[SubscribeIterator](descriptor[name], observations, name);
}

var SubscribeIterator = Symbol('@kingjs/Observable.subscribe-iterator');
Object.prototype[SubscribeIterator] = function(iterator, observations, name) {
  // pump data into iterator and publish results to observations[name]
  
  var next;

  return this.subscribe({
    next: o => observe(o),
    complete: () => observe(null)
  })

  function observe(o) {
    try {
      if (!next)
        next = iterator.next();

      if (next.done)
        return;

      next = iterator.next(o);

      if (observations)
        observations[name] = next.value;
    } 
    catch(e) { log(e) }
  }
}

module.exports = execute;

execute().then();