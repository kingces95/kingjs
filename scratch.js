var zlib = require('zlib');

var buf;


const input = '.................................';
zlib.deflate(input, (err, buffer) => {
  if (!err) {
    buf = buffer;
    console.log(buffer.toString('base64'));
  } else {
    // handle error
  }
});

const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
zlib.unzip(buffer, (err, buffer) => {
  if (!err) {
    console.log(buffer.toString());
  } else {
    // handle error
  }
});