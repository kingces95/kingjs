'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {

}
readMe();

assertTheory(function(test, id) {
  var value = test.value;

  if (test.valueNested) {
    value = { [test.name]: value };

    if (test.frozen)
      Object.freeze(value);
  }

  var func = null;
  if (test.func)
    func = x => x + 'func';

  var path = null;
  if (test.path)
    path = x => x + 'path';

  if (test.pathNested)
    path = { [test.name]: path };

  var result = update(value, path, func, test.copyOnWrite);

  if (test.pathNested) {

    if (test.valueNested) {
      assert(Object.isFrozen(result) == test.frozen);

      result = result[test.name];

      if (test.func)
        assert(result == test.value + 'func');
      else if (test.path)
        assert(result == test.value + 'path');
      else
        assert(result === test.value);
    }
    else {

    }

  } else {
  }

}, {
  name: 'foo',
  value: [ undefined, null, 0, 1 ],
  frozen: [ false, true ],
  copyOnWrite: [ false, true ],
  func: [ false, true ],
  path: [ false, true ],
  valueNested: [ true, false ],
  pathNested: [ true, false ]
}, 16);