var assert = require('assert')
var initializeExtension = require('..');

function capitalize() {
  var firstChar = this.charAt(0);

  // capitalize
  firstChar = firstChar.toUpperCase();
  
  var result = firstChar + this.substring(1, this.length);
  return result;
}

var Capitalize = Symbol(capitalize.name);

Object.defineProperty(
  Object.prototype,
  Capitalize,
  initializeExtension.call(
    { value: capitalize },
    Capitalize,
    () => String
  )
);

var test = 'foobar'[Capitalize]();
assert(test == 'Foobar');

var descriptor = Object.getOwnPropertyDescriptor(String.prototype, Capitalize);
assert(descriptor.value == capitalize);

assert.throws(() => [][Capitalize]());
