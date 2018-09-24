'use strict';

var clear = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {
  var descriptor = { x:0 };
  clear.call(descriptor, 'x');
  assert('x' in descriptor == false);
}
readMe();

assertTheory(function(test, id) {
  var prototype = null;

  if (test.hasPrototype) {
    prototype = { };
    if (test.hasInheritedValue)
      prototype[test.name] = test.inheritedValue;
  }

  var descriptor = Object.create(prototype);
  if (test.hasValue) {
    descriptor[test.name] = test.value;
  }

  if (test.freeze)
    Object.freeze(descriptor);

  var result = clear.call(descriptor, test.name, test.copyOnWrite);
  assert(test.name in result == false);

  var hasInheritedValue = test.hasPrototype && test.hasInheritedValue;
  var hasValue = test.hasValue || hasInheritedValue;
  var notCopied = !hasValue || (!hasInheritedValue && !test.copyOnWrite && !test.freeze);
  assert((result === descriptor) == notCopied);

}, {
  name: 'foo',
  hasValue: [ true, false ],
  value: [ undefined, null, 0, 1 ],
  hasPrototype: [ true, false ],
  hasInheritedValue: [ true, false ],
  inheritedValue: [ undefined, null, 0, 1 ],
  freeze: [ false, true ],
  copyOnWrite: [ false, true ]
})