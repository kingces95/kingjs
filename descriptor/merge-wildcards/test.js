'use strict';

var mergeWildcards = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isEnumerable = testRequire('@kingjs/is-enumerable');

var star = '*';

function readMe() {

  var people = {
    alice: { level: 0 },
    bob: { level: 1 },
    chris: { level: 2 }
  }
  
  var promotions = {
    alice: 2,
    [star]: 1
  }
  
  var specificPromotions = mergeWildcards.call(
    promotions, people
  );
  
  for (var name in specificPromotions)
    people[name].level += specificPromotions[name];

  assert(people.alice.level == 2);
  assert(people.bob.level == 2);
  assert(people.chris.level == 3);
}
readMe();

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

  var result = mergeWildcards.call(target, source, test.copyOnWrite);

  assert(test.frozen == Object.isFrozen(result));
  assert(!isEnumerable.call(result, star));

  var write = test.targetHasWildcard;
  var copyOnWrite = test.frozen || test.copyOnWrite;
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
  copyOnWrite: [ false, true ],
  targetHasValue: [ false, true ],
  targetValue: [ undefined, null, 0, 1 ],
  targetHasWildcard: [ false, true ],
  hasSource: [ false, true ],
  sourceHasValue: [ false, true ],
  sourceValue: [ undefined, null, 0 , 1 ]
});