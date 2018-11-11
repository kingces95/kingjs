'use strict';

var scorch = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var clone = testRequire('@kingjs/descriptor.clone');
var isFrozen = testRequire('@kingjs/descriptor.is-frozen');

assertTheory(function (test, id) { 
  var target = { };
  target[test.name] = test.value;

  if (!test.frozen)
    target = clone.call(target);

  var result = scorch.call(target);  
  var copied = result !== target;
  var written = test.value === undefined;

  assert((test.frozen && !written) == isFrozen.call(result));
  assert(!written == (test.name in result));
  assert(copied == (test.frozen && written));
  
}, {
  name: 'foo',
  value: [ undefined, null, 0, 1 ],
  frozen: [ false, true ],
})

assertTheory(function (test, id) { 
  var target = [];
  for (var i = 0; i < test.length; i++)
    target[i] = i;

  if (test.first < target.length)
    target[test.first] = undefined;

  if (test.second < target.length)
    target[test.second] = undefined;

  var firstValid = test.first < target.length;
  var secondValid = test.first != test.second && test.second < target.length;

  if (!test.frozen)
    target = clone.call(target);
  
  var count = 0;
  if (firstValid) count++;
  if (secondValid) count++;

  var result = scorch.call(target);  

  assert(result.length == test.length - count);

  var written = firstValid || secondValid;
  var copied = result != target;
  assert(copied == (written && test.frozen));

  for (var i = 0, j = 0; i < test.length; i++) {
    if (i == test.first)
      continue;
    if (i == test.second)
      continue;
    assert(result[j++] == i);
  }
}, {
  length: [ 0,1,2,3,4,5 ],
  first: [ 0,1,2,3,4,5 ],
  second: [ 0,1,2,3,4,5 ],
  frozen: [ false, true ],
})