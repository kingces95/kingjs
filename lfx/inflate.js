var {
  fs, zlib, path: Path
} = require('./dependencies');

var inflate = zlib.createInflate();

function* decompress(buffer, path, length) {
  path = Path.join(process.cwd(), path);
  var stream = inflate.pipe(fs.createWriteStream(path));
  //var stream = fs.createWriteStream(path);

  while (true) {

    var offset = buffer.indexOf("08074b50", 0, "hex");
    if (offset != -1)
      return;

    if (buffer.length < length) {
      length -= buffer.length;
    }
    else {
      stream.end(buffer.slice(0, length));
      return buffer.slice(length);
    }

    stream.write(buffer);
    buffer = yield;
  }
}

module.exports = decompress;