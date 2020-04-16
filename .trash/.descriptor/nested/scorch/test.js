'use strict';

var scorch = require('.');

var assert = require('@kingjs/assert')

function readMe() {
  'use strict';

  var values = {
    alice: {
      pet: { name: 'tiger' }
    },
    bob: {
      pet: { name: undefined }
    },
  }

  values = scorch(values, { '*': { pet: null } });

  assert(values.alice.pet.name == 'tiger');
  assert('name' in values.bob.pet == false);
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

function nestedArray(frozen) {
  var path = [[null]];

  var target = [ [ undefined ] ];
  if (frozen) Object.freeze(target);
  var result = scorch(target, path);
  assert(result instanceof Array);
  assert(result[0] instanceof Array);
  assert(result[0].length == 0);

  var target = { '0': { '0': undefined } };
  if (frozen) Object.freeze(target);
  var result = scorch(target, path);
  assert(result instanceof Array == false);
  assert(result[0] instanceof Array == false);
  assert(result[0].length === undefined);
  assert('0' in result[0] == false);
}
nestedArray(false);
nestedArray(true);

require('./theory');