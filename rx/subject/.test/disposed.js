var assert = require('assert');
var Subject = require('..');
var { Subscribe } = require('@kingjs/i-observable');
var { Complete, Error } = require('@kingjs/i-observer');

var subject = new Subject();
subject[Complete]();

var result = false;
subject[Subscribe](
  assert.fail,
  () => result = true,
  assert.fail
);
assert(result);

var E = 'E';
var subject = new Subject();
subject[Subscribe](null, null, e => null);
subject[Error](E);

var result;
subject[Subscribe](
  assert.fail,
  assert.fail,
  e => result = e,
);
assert(result == E);