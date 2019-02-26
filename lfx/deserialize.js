var { 
  ['@kingjs']: { reflect: { is } }
} = require('./dependencies');

var Pairs = require('./pairs.js');
var Deserialize = Symbol('@kingjs/stream.binary.deserialize');

var EmptyArray = [ ];

Object.prototype[Deserialize] = function* deserialize(descriptors) {
  var offset = 0;
  var buffer = EmptyArray;

  var pairs = descriptors[Pairs]();

  while (true) {
    var value;

    // get next field to deserialize
    var next = pairs.next();
    if (next.done) {
      if (buffer.length != offset)
        return buffer.slice(offset);
      return;
    }

    // update info
    var { value: { name, value: info} } = next;

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
          this[flagName] = (value & 1 << flag.bit) != 0;
        }
      }
    }

    // publish value
    this[name] = value;
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

module.exports = Deserialize;