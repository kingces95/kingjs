'use strict';

var scorch = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isFrozen = testRequire('@kingjs/descriptor.is-frozen');

assertTheory(function (test, id) { 
  var target = { };
  target[test.name] = test.value;

  var result = scorch.call(target); 
  assert(target[test.name] === test.value);
  assert(isFrozen.call(result));

  var copied = result !== target;
  var written = test.value === undefined;
  assert(!written == (test.name in result));
  assert(copied == written);
  
}, {
  name: 'foo',
  value: [ undefined, null, 0, 1 ],
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

  var count = 0;
  if (firstValid) count++;
  if (secondValid) count++;

  var result = scorch.call(target);  

  assert(result.length == test.length - count);

  var written = firstValid || secondValid;
  var copied = result != target;
  assert(copied == written);

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
  second: [ 0,1,2,3,4,5 ]
})