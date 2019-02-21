'use strict';

var reduce = require('.');

var assert = require('@kingjs/assert')

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

  var paths = {
    '*': { pet: null },
    special: { name: null }
  }

  var result = reduce(people, paths, (a, o) => { a.push(o); }, []);

  assert(result.length == 4);
  assert(result.indexOf('tiger') != -1);
  assert(result.indexOf('snuggles') != -1);
  assert(result.indexOf('spike') != -1);
  assert(result.indexOf('zambia') != -1);
}
readMe();

function noMatches() {
  var result = reduce(undefined, { });
  assert(result === undefined);

  var result = reduce(0, { });
  assert(result === undefined);
}
noMatches();

function noTree() {
  var result = reduce(undefined, undefined, (a, x) => x);
  assert(result == undefined);
}
noTree();

require('./theory');