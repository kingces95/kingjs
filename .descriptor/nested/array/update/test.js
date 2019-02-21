'use strict';

var update = require('.');

var assert = require('assert');

function readMe() {

  var people = {

    alice: {
      name: 'Alice',
    },
    bob: {
      name: 'Bob', 
    },
    chris: {
      name: 'Chris',
    }
  };

  var tree = [['bob'], 'chris', 'alice'];

  var result = update(
    tree,
    x => people[x]
  )

  assert(result instanceof Array);
  assert(result[0] instanceof Array);

  assert(result[0][0] == people.bob);
  assert(result[1] == people.chris);
  assert(result[2] == people.alice);
}
readMe();

require('./theory');