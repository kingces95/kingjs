var { 
  assert, fs, http, crypto, zlib, os,
  fs, fs: { promises: fsPromises },
  path: Path, url: Url,
  rxjs: { Subject },
  uuid: { v4: uuid },
  readline,
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
  downloads: '.downloads',
  compressed: '.compressed',
  decompressed: '.decompressed',
  target: '.target',
}

var nop = () => { };
var log = console.log.bind(console);

/**
 * path - path to info file
 * url - compressed file url
 * 
 * downloads - path to download file; will be published to `compressed`
 * compressed - path to compressed file; will be inflated to `decompressed`
 * decompressed - path to decompressed file
 * 
 * contentLength - compressed file size
 * downloadedLength - compressed bytes downloaded
 * hash - MD5 hash of compressed file
 */
class Info {
  static async create(path) {
    var result = new Info(path);

    var json = JSON.parse(await fsPromises.readFile(path, Encoding));
    for (var name in json)
      result[name] = json[name];

    return result;
  }

  constructor(path) {
    this.path = path;
    this.source = Path.join(DirNames.target, Path.basename(path, DotJson));
    this.uuid = uuid();
  }
  get name() { 
    if (!this.url)
      return;
    return Url.parse(this.url).pathname;
  }
  get nameUuid() { 
    return this.uuid + this.ext;
  }
  get nameHash() { 
    if (!this.hash)
      return;
    return this.hash + this.ext;
  }
  get ext() {
    if (!this.name)
      return;
    return Path.extname(this.name);
  }
  get downloaded() { 
    return Path.join(DirNames.downloads, this.nameUuid);
  }
  get compressed() { 
    if (!this.hash)
      return;
    return Path.join(DirNames.compressed, this.nameHash);
  }
  get decompressedUuid() { 
    return Path.join(DirNames.decompressed, this.nameUuid);
  }
  get decompressed() { 
    if (!this.hash)
      return;
    return Path.join(DirNames.decompressed, this.nameHash);
  }
}

function log() {
  console.log.apply(this, arguments);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mkdir(path) {
  await fsPromises.mkdir(path, MkdirRecursive);
  return path;
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
  start(recursiveSync(Dot));
}

async function* recursiveSync(source) {
  var loggerStarted = false;
  var infos = { };
  var finished = [ ];
  var entries = await fsPromises.readdir(source, WithFileTypes);

  for (var entry of entries) {
    var path = Path.join(source, entry.name);

    if (entry.isDirectory()) {
      if (entry.name[0] == Dot)
        continue;

      yield recursiveSync(path);
      continue;
    }

    yield [ sync(path) ];
  }

  async function sync(path) {
    var info = await Info.create(path);
    infos[path] = info;

    if (!loggerStarted) {
      loggerStarted = true;
      logger();
    }      

    await link(info);
    delete infos[path];
    finished.push[info];
  }

  function dump() {
    for (var name in infos) {
      var info = infos[name];

      if ('downloadedLength' in info) {
        if ('contentLength' in info) {
          var percent = info.downloadedLength / info.contentLength;
          readline.cursorTo(process.stderr, 0);
          process.stderr.write(`${Math.round(percent * 100)}% ${info.url}`)
        }
        else {
          var megs = info.downloadedLength / OneMeg;
          sllog(`${megs.toFixed(1)} (Mb)  ${info.url}`)
        }
      }
    }
  }

  async function logger() {
    process.nextTick(async function() {
      while (true) {

        var names = Reflect.ownKeys(infos);        
        if (!names.length)
          break;
        
        dump();
        await sleep(OneSecond / LogFrequency);
      }

      dump();
    })
  }
}

async function link(info) {
  var info = await decompress(info);
}

async function decompress(info) {
  var info = await download(info);
  return info;
}

async function download(info) {
  try {
    if (!info.hash) {
      var backPressure = [];
      info.backPressure = backPressure;

      // while streaming: save to disk, decompress, compute hash, report progress
      var subject = new Subject();
      subject[SubscribeProperties](info, {

        // download file
        downloadedLength: write(info.downloaded, backPressure),

        // decompressed file on the fly
        unzip: unzip(info.decompressedUuid, backPressure),

        // compute hash
        hash: hash(),
      });

      // start streaming zip file & observe incoming chunks
      var downloadStream = await get(info.url, info, 'contentLength');
      await downloadStream[Subscribe](subject, backPressure)

      // publish downloaded file to compressed
      await mkdir(Path.dirname(info.compressed));
      await fsPromises.rename(info.downloaded, info.compressed);

      // create alias for decompressed directory/file; hash -> uuid 
      await fsPromises.symlink(info.nameUuid, info.decompressed, 'dir')
    }

    return info;
  } 
  catch(e) {
    log(info.path, e);
    info.error = e;
    observer.error(e);
  } 
}

function* unzip(dir, backPressure) {
  var buffer;
  var observations = { };

  while (true) {
    var header = { };
    buffer = yield* deserialize(buffer, header, LocalFileHeader);

    var path = Path.join(dir, header.fileName);
    //log('inflating', path);
    var isCompressed = header.compression != 'noCompression';
    var isDirectory = !isCompressed && !header.uncompressedSize;
    var hasDataDescriptor = header.hasDataDescriptor;

    // skip empty directories
    if (isDirectory) {
      assert(!hasDataDescriptor);
      continue;
    }

    // uncompressed file
    assert(isCompressed || !hasDataDescriptor);
    if (!isCompressed) {
      buffer = yield* writeCount(
        path, buffer, header.compressedSize, observations, backPressure
      );
      continue;
    }

    // compressed file
    var error;
    var numberRead = 0;
    var stream = zlib.createInflateRaw();
    start(async () => {
      try {
        // drain deflated stream into file on disk
        var subject = new Subject();
        subject[SubscribeProperties](observations, {
          [path]: write(path, backPressure)
        })
        await stream[Subscribe](subject, backPressure)
      } 
      catch(e) { error = e }
    });

    // pump inflated bytes into stream and return remainder
    buffer = yield* inflate(stream, buffer, observations, backPressure);

    // propagate error
    if (error) {
      subject.error();
      throw error;
    }

    if (hasDataDescriptor)
      buffer = yield* deserialize(buffer, header, DataDescriptor);
    assert(stream.bytesWritten == header.compressedSize);
  }
}

function* inflate(stream, buffer, observations, backPressure) {
  var buffers = [];
  var totalBytesFlushed = 0;
  var bytesWritten = 0;
  var completed = false;

  var ended = stream[Ended]();

  while (true) {

    if (!completed && !stream.write(buffer)) 
      backPressure.push(Promise.race([ended, stream[Drained]()]));

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
    assert(stream.bytesWritten == totalBytesFlushed);

    if (ended.resolved)
      break;

    buffer = yield observations;
    if (!buffer)
      break;
  }

  assert(stream.bytesWritten == totalBytesFlushed);
  return Buffer.concat(buffers);
}

function* writeCount(streamOrPath, buffer, count, observations,  backPressure) {
  
  var stream = streamOrPath;
  if (is.string(streamOrPath)) {
    backPressure.push(mkdir(Path.dirname(streamOrPath)));
    yield observations;
    stream = fs.createWriteStream(streamOrPath);
  }

  var buffer;
  while (true) {

    if (count == 0)
      break;

    if (count <= buffer.length) {
      stream.write(buffer.slice(0, count));
      buffer = buffer.slice(count);
      count = 0;
      continue;
    }

    if (!stream.write(buffer)) 
      backPressure.push(stream[Drained]());
    count -= buffer;

    buffer = yield observations;
  }

  stream.end();
  return buffer;
}

function* write(streamOrPath, backPressure) {
  var bytesWritten = 0;

  var stream;
  var buffer;
  while (buffer = yield bytesWritten) {

    if (!stream) {
      stream = streamOrPath;
      if (is.string(streamOrPath)) {
        backPressure.push(mkdir(Path.dirname(streamOrPath)));
        yield bytesWritten;
        stream = fs.createWriteStream(streamOrPath);
      }
    }

    if (!stream.write(buffer)) 
      backPressure.push(stream[Drained]());
    bytesWritten += buffer.length;
  }

  stream.end();
  return bytesWritten;
}

function* hash() {
  var hash = crypto.createHash(Sha256);

  while (buffer = yield)
    hash.update(buffer);

  return hash.digest(Hex);
}

function end(stream, buffer) {
  return new Promise(function(resolve, reject) {
    stream
      .on('error', reject)
      .end(buffer, resolve);
  });
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

var Ended = Symbol('@kingjs/stream.ended');
Object.prototype[Ended] = function ended() {
  var stream = this;
  var promise = new Promise(function(resolve, reject) {
    var onError = e => {
      reject(e);
      promise.rejected = true;
    };
    stream
      .on('error', onError)
      .once('end', () => {
        stream.off('error', onError);
        resolve();
        promise.resolved = true;
      }
    );
  });

  return promise;
}

var Drained = Symbol('@kingjs/stream.drained');
Object.prototype[Drained] = function drained() {
  var stream = this;
  var promise = new Promise(function(resolve, reject) {
    var onError = e => {
      reject(e);
      promise.rejected = true;
    }
    stream
      .on('error', onError)
      .once('drain', () => {
        stream.off('error', onError);
        resolve();
        promise.resolved = true;
      })
    });

  return promise;
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

        // pump empty buffers to flush back pressure
        if (backPressure.length) {
          stream.pause();

          process.nextTick(async () => {
            while (backPressure.length) {
              var promise = Promise.all(backPressure);
              backPressure.length = 0;
              await promise;

              // iterators reporting back pressure may safely ignore
              // the next buffer yielded to them. This provides iterators
              // a way to 'await' promises (e.g. directory creation)
              observer.next(EmptyBuffer);
            }
            stream.resume();
          })
        }
      })
      .on('end', () => {
        observer.complete();
        resolve();
      });
  });
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

var SubscribeProperties = Symbol('@kingjs/Observable.subscribe-properties');
Object.prototype[SubscribeProperties] = function(observations, descriptor) {
  for (var name in descriptor)
    this[SubscribeIterator](descriptor[name], observations, name);
}

module.exports = execute;

execute().then();