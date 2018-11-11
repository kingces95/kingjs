'use strict';

var mergeWildcards = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isFrozen = testRequire('@kingjs/descriptor.is-frozen');

var star = '*';

assertTheory(function(test, id) {

  var target = { };

  if (test.targetHasWildcard)
    target[star] = test.targetWildcardValue;

  if (test.targetHasValue)
    target[test.name] = test.targetValue;

  var source;
  if (test.hasSource) {
    source = { };

    if (test.sourceHasValue)
      source[test.name] = test.sourceValue;
  }

  var result = mergeWildcards.call(target, source);

  assert(star in result == false);

  var written = test.targetHasWildcard;
  assert(isFrozen.call(result));

  var copied = target != result
  assert(written == copied);

  var expected;
  if (test.targetHasValue)
    expected = test.targetValue;
  else if (test.targetHasWildcard && test.hasSource && test.sourceHasValue)
    expected = test.targetWildcardValue;
  assert(result[test.name] === expected);
  
}, {
  name: 'foo',
  targetHasValue: [ false, true ],
  targetValue: [ undefined, null, 0, 1 ],
  targetHasWildcard: [ false, true ],
  hasSource: [ false, true ],
  sourceHasValue: [ false, true ],
  sourceValue: [ undefined, null, 0 , 1 ]
});