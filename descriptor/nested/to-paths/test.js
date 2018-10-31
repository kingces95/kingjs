'use strict';

var toPaths = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {

  var people = {
    alice: { 
      pet: 'tiger' 
    },
    bob: { 
      pet: 'snuggles' 
    },
    chris: {
      pet: 'spike'
    }
  };
  
  var result = toPaths(
    people, 
    x => x instanceof Object, 
    null
  );

  assert(result.alice.pet === null);
  assert(result.bob.pet === null);
  assert(result.chris.pet === null);
}
readMe();

require('./theory');