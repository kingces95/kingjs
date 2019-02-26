var {
  fs, zlib, path: Path
} = require('./dependencies');

var inflate = zlib.createInflate();

function* decompress(path, length) {
  path = Path.join(process.cwd(), path);
  var stream = inflate.pipe(fs.createWriteStream(path));
  //var stream = fs.createWriteStream(path);

  while (true) {
    var buffer = yield;

    if (buffer.length < length) {
      length -= buffer.length;
    }
    else {
      stream.end(buffer.slice(0, length));
      return buffer.slice(length);
    }

    stream.write(buffer);
  }
}

module.exports = decompress;