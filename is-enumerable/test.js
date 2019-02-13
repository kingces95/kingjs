'use strict';

var isEnumerable = require('.');

var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');

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

  if (test.inherited) {
    object = Object.create(object);

    if (test.override) {
      Object.defineProperty(
        object,
        test.name, {
          enumerable: test.overrideEnumerable
        }
      )
    }
  }

  var result = isEnumerable.call(object, test.name);

  var expected = 
    (test.inherited && test.override) ? test.overrideEnumerable : 
    test.defined ? test.enumerable :
    false;

  assert(result == expected);

}, {
  name: 'foo',
  enumerable: [ true, false ],
  inherited: [ true, false ],
  defined: [ true, false ],
  override: [ false, true ],
  overrideEnumerable: [ false, true ]
})
