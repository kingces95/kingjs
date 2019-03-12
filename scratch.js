var zlib = require('zlib');
var assert = require('assert');

const input = Buffer.from('0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');

zlib.deflateRaw(input, (err, deflatedBuffer) => {
  assert(!err);

  var bytesRead = 0;
  var buffers = [];

  var stream = zlib.createInflateRaw();

  stream.on('error', e => {
    // I expect notification the EOF of the deflate stream has been found
    console.log('error', e);
  })

  stream.on('data', function(chunk) {
    buffers.push(chunk);
    bytesRead += chunk.length;
    console.log('decompressed:', 'written', stream.bytesWritten, 'read', bytesRead);
  })

  stream.on('finish', function() {
    var result = Buffer.concat(buffers, bytesRead);
    this.close();
    console.log('result:', result.toString());
    console.log('chunks:', buffers.length);
    console.log('bytesWritten:', stream.bytesWritten);
    console.log('numberRead:', bytesRead);
  })

  console.log('download: started')
  stream.write(deflatedBuffer.slice(0, 5));
  stream.write(deflatedBuffer.slice(5, 10));

  console.log('download: delayed')
  setTimeout(() => {
    console.log('download: resumed')
    stream.write(deflatedBuffer.slice(10));
    stream.write(Buffer.from([1,2,3,4,5,6])); // discarded
    stream.write(Buffer.from([1,2,3,4,5,6])); // discarded
    stream.write(Buffer.from([1,2,3,4,5,6])); // discarded
    console.log('download: finished')
    stream.end();
  }, 1000);
});

