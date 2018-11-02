'use strict';

var clear = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

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

  var result = clear.call(descriptor, test.name);
  assert(test.name in result == false);

  var hasInheritedValue = test.hasPrototype && test.hasInheritedValue;
  var hasValue = test.hasValue || hasInheritedValue;
  var notCopied = !hasValue || (!hasInheritedValue && !test.freeze);
  assert((result === descriptor) == notCopied);

}, {
  name: 'foo',
  hasValue: [ true, false ],
  value: [ undefined, null, 0, 1 ],
  hasPrototype: [ true, false ],
  hasInheritedValue: [ true, false ],
  inheritedValue: [ undefined, null, 0, 1 ],
  freeze: [ false, true ]
})

function foo() {
  this.pop();
}

assertTheory(function(test, id) {

  var descriptor = [];
  for (var i = 0; i < test.values; i++)
    descriptor.push(i);

  if (test.freeze)
    Object.freeze(descriptor);

  var result = clear.call(descriptor, test.index);
  var indexValid = test.index < test.values;
  assert(result.length == test.values - (indexValid ? 1 : 0));

  var copied = test.index < test.values - (test.freeze ? 0 : 1);
  assert(copied == (result != descriptor));

}, {
  values: [ 0, 1, 2, 3 ],
  index: [ 0, 1, 2, 3 ],
  freeze: [ false, true ]
})