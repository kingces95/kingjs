'use strict';

var forEach = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var values = {
    alice: { 
      pet: 'tiger' 
    },
    bob: { 
      pet: 'snuggles' 
    },
    chris: {
      pet: 'spike'
    }
  }

  var result = [ ];
  function pushResult(value) { 
    result.push(value); 
  }

  var tree = {
    alice: { pet: null },
    bob: { pet: null },
  }

  var tree2 = {
    '*': { pet: null },
  }

  forEach(values, tree2, pushResult);
}
readMe();