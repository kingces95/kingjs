'use strict';

var forEach = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  'use strict';

  var values = {
    alice: {
      pet: { name: 'tiger' }
    },
    bob: {
      pet: { name: 'snuggles' }
    },
    chris: {
      pet: { name: 'spike' }
    },
  }

  var result = { };
  forEach(values, { 
    '*': { 
      pet: { 
        name: null 
      } 
    } 
  }, o => result[o] = true);

  assert(result.tiger);
  assert(result.snuggles);
  assert(result.spike);
}
readMe();

require('./theory');