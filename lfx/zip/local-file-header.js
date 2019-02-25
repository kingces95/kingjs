var ZipFlags = {
  // indicates that the file is encrypted
  isEncryptedFile: { bit: 0 },

  // 'deflating' compression:
  //    0:normal (-en), 1:maximum (-exx/-ex), 
  //    2: fast (-ef), 3: super fast (-es)
  // 'imploding' compression: n/a
  // 'LZMA' compression: n/a
  //compressionOption: { bit: 1, count: 2 },

  // crc-32, compressed size, and uncompressed size are 0
  // correct values are put in the data descriptor following
  // the compressed date. Applies only to 'deflating' compression
  isDataDescriptor: { bit: 3 },

  // Reserved for use with method 8, for enhanced deflating.
  isEnhancedDeflation: { bit: 4 },

  // file is compressed patched data.
  isCompressedPatchedData: { bit: 5 },

  // version needed to extract value at least 50 and bit 0 set
  // If AES encryption is used, the version will be at least 51
  isStrongEncryption: { bit: 6 },

  // filename and comment fields for this file are UTF-8
  isLanguageEncoding: { bit: 11 },

  // Set when encrypting the Central Directory to indicate 
  // selected data values in the Local Header are masked to
  // hide their actual values.
  isMaskHeaderValues: { bit: 13 },
}

var ZipCompressionMethod = [
  'noCompression',
  'shrunk',
  'reducedWithCompressionFactor1',
  'reducedWithCompressionFactor2',
  'reducedWithCompressionFactor3',
  'reducedWithCompressionFactor4',
  'imploded',
  null,
  'deflated',
  'enhancedDeflated',
  'pKWareDCLImploded',
  null,
  'bZip2',
  null,
  'lzma',
  null, 
  null, 
  null,
  'ibmTerse',
  'ibmLZ77z'
]

var ZipLocalFileHeaderInfo = {
  signature: { bytes: 4, magic: [0x50,0x4b,0x03,0x04] },
  version: { bytes: 2 },
  flags: { bytes: 2, flags: ZipFlags },
  compression: { bytes: 2, enum: ZipCompressionMethod },
  modificationTime: { bytes: 2 },
  modificationDate: { bytes: 2 },
  crc: { bytes: 4 },
  compressedSize: { bytes: 4 },
  uncompressedSize: { bytes: 4 },
  fileNameLength: { bytes: 2 },
  extraFieldLength: { bytes: 2 },
  fileName: { bytes: 'fileNameLength', string: true },
  extraField: { bytes: 'extraFieldLength', ignore: true }
}

module.exports = ZipLocalFileHeaderInfo;