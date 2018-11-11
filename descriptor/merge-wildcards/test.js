'use strict';

var mergeWildcards = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');
var clone = testRequire('@kingjs/descriptor.object.clone');

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

function precondition() {
  var thawed = clone.call({ });
  assert(!isFrozen.call(thawed));
  assertThrows(() => mergeWildcards.call(thawed));
}
precondition();

require('./theory')