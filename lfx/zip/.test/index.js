var assert = require('assert');
var deserialize = require('../deserialize.js');
var LocalFileHeader = require('../local-file-header.js');

// from https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html
var buffers = [
  [
    0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x00, 0x00,  0x08, 0x00, 0x1c, 0x7d, 0x4b, 0x35, 0xa6, 0xe1,
  ], [
    0x90, 0x7d, 0x45, 0x00, 0x00, 0x00, 0x4a, 0x00,  0x00, 0x00, 0x05, 0x00, 0x15, 0x00, 0x66, 0x69,
  ], [
    0x6c, 0x65, 0x31, 0x55, 0x54, 0x09, 0x00, 0x03,  0xc7, 0x48, 0x2d, 0x45, 0xc7, 0x48, 0x2d, 0x45,
  ], [
    0x55, 0x78, 0x04, 0x00, 0xf5, 0x01, 0xf5, 0x01
  ]
];

var header = { };
var i = 0;
var buffer;
var iterator = deserialize.call(header, buffer = buffers[i++]);
iterator.next();

var result;
for (var name in LocalFileHeader) {
  result = iterator.next({ name, info: LocalFileHeader[name] });
  while (result.value === false)
    result = iterator.next(buffer = buffers[i++]);
}

assert(!result.done);
assert(result.value == buffer.length);

assert(header.fileName == 'file1');
assert(header.fileNameLength == 5);
assert(header.compression == 'deflated');
assert(header.compressedSize == 69);
assert(header.uncompressedSize == 74);
assert(header.version == 20);
assert(header.flags == 0);
