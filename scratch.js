var zlib = require('zlib');
var assert = require('assert');

const input = Buffer.from('0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');

var log = console.log.bind(console);

zlib.deflateRaw(input, (err, deflatedBuffer) => {
  assert(!err);

  var bytesRead = 0;
  var buffers = [];

  var stream = zlib.createInflateRaw();
  var position = 0;

  stream.on('data', function(chunk) {
    buffers.push(chunk);
    bytesRead += chunk.length;
    log('decompressed:', 'written', stream.bytesWritten, 'read', bytesRead);
  })

  stream.on('end', function done() {
    var result = Buffer.concat(buffers, bytesRead);
    this.close();
    log('result:', result.toString());
    log('chunks:', buffers.length);
    log('bytesWritten:', stream.bytesWritten);
    log('numberRead:', bytesRead);
    log('discarded:', position - stream.bytesWritten);
  });

  log('download: started')
  stream.write(deflatedBuffer.slice(0, 5)); position += 5;
  stream.write(deflatedBuffer.slice(5, 10)); position += 5;
  stream.write(deflatedBuffer.slice(10)); position += deflatedBuffer.length - 10;
  stream.write(Buffer.from([1,2,3,4,5,6])); position += 6; // discarded

  log('download: delayed')
  setTimeout(() => {
    log('download: resumed')
    try {
      log(stream.write(Buffer.from([1,2,3,4,5,6]))); // rejected
    } catch(e) { log(e); }
    
    log('download: finished')
    stream.end();
  }, 1000);
});

