'use strict';

var reduce = require('.');
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
    },
    special: {
      pet: 'ghost',
      name: 'zambia'
    }
  }

  var tree = {
    '*': { pet: null },
    special: { name: null }
  }

  var result = reduce(people, tree, (a, o) => {
    if (!a)
      a = [];
    a.push(o);
    return a;
  });

  assert(result.length == 4);
  assert(result.indexOf('tiger') != -1);
  assert(result.indexOf('snuggles') != -1);
  assert(result.indexOf('spike') != -1);
  assert(result.indexOf('zambia') != -1);
}
readMe();

function nullIfNoMatches() {
  var result = reduce(undefined, { });
  assert(result == null);

  var result = reduce(0, { });
  assert(result == null);
}
nullIfNoMatches();

function nullIfNoTree() {
  var result = reduce();
  assert(result == null);
}
nullIfNoTree();

require('./theory');