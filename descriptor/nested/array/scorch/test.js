'use strict';

var scorch = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  'use strict';

  var values = [
      ['tiger'],
      [undefined]
  ]

  scorch(values);

  assert(values[0] == 'tiger');
  assert('1' in values == false);
}
readMe();

function simplest() {
  var result = scorch({ foo: undefined });
  assert('foo' in result == false);

  var result = scorch({ foo: undefined }, { });
  assert('foo' in result == false);
}
simplest();

function nested() {
  var result = scorch({ bar: { foo: undefined } }, { bar: undefined });
  assert('foo' in result.bar === false);

  var result = scorch({ bar: { foo: undefined } }, { '*': undefined });
  assert('foo' in result.bar === false);

  var result = scorch({ bar: { foo: undefined } }, { });
  assert('foo' in result.bar === true);
}
nested();

require('./theory');