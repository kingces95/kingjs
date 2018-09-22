'use strict';

var mergeWildcards = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

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

require('./theory')