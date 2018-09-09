'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {

  var people = {

    alice: {
      name: 'Alice',
      follows: 'bob'
    },
    bob: {
      name: 'Bob', 
      follows: 'chris'
    },
    chris: {
      name: 'Chris',
      follows: 'alice'
    }
  };

  var callback = function(name) {
    return people[name];
  };

  var result = update(
    people,
    { '*': { follows: callback } }
  )

  assert(result.alice.follows == people.bob);
  assert(result.alice.name == 'Alice');
  assert(result.bob.follows == people.chris);
  assert(result.bob.name == 'Bob');
  assert(result.chris.follows == people.alice);
  assert(result.chris.name == 'Chris');
}
readMe();

require('./theory');