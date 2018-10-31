'use strict';

var toPaths = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {

  var people = [
    [ 
      ['tiger'] 
    ], [ 
      ['snuggles'] 
    ], [
      ['spike']
    ]
  ];
  
  var result = toPaths(
    people, 
    null
  );

  assert(result[0][0][0] === null);
  assert(result[1][0][0] === null);
  assert(result[2][0][0] === null);
}
readMe();

//require('./theory');