'use strict';

var toArray = require('.');

var assert = require('@kingjs/assert')

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

  var result = toArray(values, tree);
  assert(result.length == 4);
  assert(result.indexOf('tiger') != -1);
  assert(result.indexOf('snuggles') != -1);
  assert(result.indexOf('spike') != -1);
  assert(result.indexOf('zambia') != -1);
}
readMe();

function nullIfNoMatches() {
  var result = toArray(undefined, { });
  assert(result == null);

  var result = toArray(0, { });
  assert(result == null);
}
nullIfNoMatches();

function nullIfNoTree() {
  var result = toArray();
  assert(result == null);
}
nullIfNoTree();

require('./theory');