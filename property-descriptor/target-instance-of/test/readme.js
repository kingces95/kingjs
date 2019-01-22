/** @fileoverview extend the builtin String with a capitalize 
 * function like this:
 * */

var assert = require('assert')
var targetInstanceOf = require('..');

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
  targetInstanceOf.call(
    { value: capitalize },
    () => String,
    Capitalize
  )
);

var test = 'foobar'[Capitalize]();
assert(test == 'Foobar');

var descriptor = Object.getOwnPropertyDescriptor(String.prototype, Capitalize);
assert(descriptor.value == capitalize);

assert.throws(() => [][Capitalize]());
