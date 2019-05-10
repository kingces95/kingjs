var assert = require('assert');
var Deserialize = require('../../deserialize.js');
var LocalFileHeader = require('../local-file-header.js');

// from https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html
var buffers = [
  [
    0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x01, 0x00,  0x08, 0x00, 0x1c, 0x7d, 0x4b, 0x35, 0xa6, 0xe1,
  ], [
    0x90, 0x7d, 0x45, 0x00, 0x00, 0x00, 0x4a, 0x00,  0x00, 0x00, 0x05, 0x00, 0x15, 0x00, 0x66, 0x69,
  ], [
    0x6c, 0x65, 0x31, 0x55, 0x54, 0x09, 0x00, 0x03,  0xc7, 0x48, 0x2d, 0x45, 0xc7, 0x48, 0x2d, 0x45,
  ], [
    0x55, 0x78, 0x04, 0x00, 0xf5, 0x01, 0xf5, 0x01,  0xFF
  ]
];

var header = { };
var i = 0;
var buffer;
var iterator = header[Deserialize](LocalFileHeader);

var next = iterator.next();
while(!next.done) {
  buffer = buffers[i++];
  next = iterator.next(buffer);
}

var result = next.value;
assert(result.length == 1);
assert(result[0] == 0xFF);

assert(header.compressedSize == 69);
assert(header.compression == 'deflated');
assert(header.crc.toString(16) == "7d90e1a6");
assert(header.extraField === undefined);
assert(header.extraFieldLength === 21);
assert(header.fileName == 'file1');
assert(header.fileNameLength == 5);
assert(header.flags == 1);
assert(header.isEncryptedFile === true);
assert(header.modificationDate == 13643);
assert(header.modificationTime == 32028);
assert(header.signature.toString(16) == '4034b50');
assert(header.uncompressedSize == 74);
assert(header.version == 20);
