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

function arrayTest() {

  var people = [
    [ 'tiger' ],
    [ 'snuggles' ],
    [ [ 'spike' ] ],
  ];
  
  var result = toPaths(
    people, 
    x => x instanceof Object, 
    null
  );

  assert(result instanceof Array);
  assert(result[0] instanceof Array);
  assert(result[2][0] instanceof Array);

  assert(result[0][0] === null);
  assert(result[1][0] === null);
  assert(result[2][0][0] === null);
}
arrayTest();

require('./theory');