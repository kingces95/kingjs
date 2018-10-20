'use strict';

var mergeWildcards = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

var star = '*';

assertTheory(function(test, id) {

  var target = { };

  if (test.targetHasWildcard)
    target[star] = test.targetWildcardValue;

  if (test.targetHasValue)
    target[test.name] = test.targetValue;

  if (test.frozen)
    Object.freeze(target);

  var source;
  if (test.hasSource) {
    source = { };

    if (test.sourceHasValue)
      source[test.name] = test.sourceValue;
  }

  var result = mergeWildcards.call(target, source);

  assert(star in result == false);
  assert(test.frozen == Object.isFrozen(result));

  var write = test.targetHasWildcard;
  var copyOnWrite = test.frozen;
  assert((write && copyOnWrite) == (target != result));

  var expected;
  if (test.targetHasValue)
    expected = test.targetValue;
  else if (test.targetHasWildcard && test.hasSource && test.sourceHasValue)
    expected = test.targetWildcardValue;
  assert(result[test.name] === expected);
  
}, {
  name: 'foo',
  frozen: [ false ],
  targetHasValue: [ false, true ],
  targetValue: [ undefined, null, 0, 1 ],
  targetHasWildcard: [ false, true ],
  hasSource: [ false, true ],
  sourceHasValue: [ false, true ],
  sourceValue: [ undefined, null, 0 , 1 ]
});