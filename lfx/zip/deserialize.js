var { 
  ['@kingjs']: { reflect: { is } }
} = require('../dependencies');

function* decodeIterator(buffer) {
  var offset = 0;

  while (true) {
    var value;

    // update info
    var { name, info } = yield offset;

    // get bytes or pointer to bytes
    var bytes = info.bytes;
    if (is.string(bytes))
      bytes = this[bytes];

    // decode string
    if (info.string) {
      var charCodes = [];
      yield* forEach(bytes, byte => charCodes.push(byte));
      value = String.fromCharCode(...charCodes);
    }

    // ignore
    else if (info.ignore) {
      yield* forEach(bytes, () => null);
    }

    // decode little endian
    else {
      var number = 0;
      yield* forEach(bytes, (byte, i) => number |= byte << (8 * i));
      value = number;
      
      // map enumeration
      if (info.enum)
        value = info.enum[value];
    }

    // publish value
    this[name] = value;
  }

  function* forEach(bytes, callback) {
    for (var i = 0; i < bytes; i++) {
      while (offset == buffer.length) {
        offset = 0;
        buffer = yield false;
      }
      callback(buffer[offset++], i);
    }
  }
}

module.exports = decodeIterator;