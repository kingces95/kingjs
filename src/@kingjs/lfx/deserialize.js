var { 
  ['@kingjs']: { reflect: { is } }
} = module[require('@kingjs-module/dependencies')]();

var Pairs = require('./pairs.js');

var EmptyArray = [ ];
var EmptyBuffer = Buffer.alloc(0);

function* deserialize(buffer, target, descriptors) {
  var offset = 0;
  var pairs = descriptors[Pairs]();
  buffer = buffer || EmptyArray;

  while (true) {
    var value;

    // get next field to deserialize
    var next = pairs.next();
    if (next.done) {
      if (buffer.length != offset)
        return buffer.slice(offset);
      return EmptyBuffer;
    }

    // update info
    var { value: { name, value: info} } = next;

    // get bytes or pointer to bytes
    var bytes = info.bytes;
    if (is.string(bytes))
      bytes = target[bytes];

    // decode string
    if (info.string) {
      var charCodes = [];
      yield* forEach(bytes, byte => charCodes.push(byte));
      value = String.fromCharCode(...charCodes);
    }

    // ignore
    else if (info.ignore) {
      yield* forEach(bytes, () => null);
      value = undefined;
    }

    // decode little endian
    else {
      var number = 0;
      yield* forEach(bytes, (byte, i) => number |= byte << (8 * i));
      value = number;
      
      // map enumeration
      if (info.enum)
        value = info.enum[value];

      // map flags
      else if (info.flags) {
        for (var flagName in info.flags) {
          var flag = info.flags[flagName];
          target[flagName] = (value & 1 << flag.bit) != 0;
        }
      }
    }

    // publish value
    target[name] = value;
  }

  function* forEach(bytes, callback) {
    for (var i = 0; i < bytes; i++) {
      while (offset == buffer.length) {
        offset = 0;
        buffer = yield;
      }
      var byte = buffer[offset++]
      callback(byte, i);
    }
  }
}

module.exports = deserialize;