'use strict';

var isEnumerable = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {
  assert(isEnumerable.call(Object.create({ toString: null }), 'toString'));
}
readMe();

assertTheory(function(test, id) {
  var object = { };
  
  if (test.defined) {
    Object.defineProperty(
      object,
      test.name, {
        enumerable: test.enumerable
      }
    )
  }

  if (test.inherited)
    object = Object.create(object);

  var result = isEnumerable.call(object, test.name);

  assert(result == (test.defined && test.enumerable));
}, {
  name: 'foo',
  enumerable: [ true, false ],
  inherited: [ true, false ],
  defined: [ true, false ]
})
