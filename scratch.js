var zlib = require('zlib');
var assert = require('assert');

const input = Buffer.from('0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');

zlib.deflate(input, (err, deflatedBuffer) => {
  assert(!err);

  var numberRead = 0;
  var buffers = [];

  var stream = zlib.createInflate()
    .on('data', function(chunk) {
      console.log(stream.bytesWritten);
      buffers.push(chunk);
      numberRead += chunk.length;
    })

  stream.write(deflatedBuffer.slice(0, 5));
  stream.write(deflatedBuffer.slice(5, 10));
  stream.write(deflatedBuffer.slice(10));
  stream.write(Buffer.from([1,2,3,4,5]));
  stream.write(Buffer.from([1,2,3,4,5,6]));
  stream.write(Buffer.from([1,2,3,4,5,6]));
  stream.end(function() {
    var result = Buffer.concat(buffers, numberRead);
    this.close();
    console.log(result.toString());
    console.log('chunks', buffers.length);
    console.log('bytesWritten', stream.bytesWritten);
    console.log('numberRead', numberRead);
  })
});

