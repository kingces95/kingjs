'use strict';

var freeze = require('.');
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

  freeze(values, { '*': { pet: null } });

  assert(Object.isFrozen(values));
  assert(Object.isFrozen(values.alice));
  assert(Object.isFrozen(values.alice.pet));
  assert(Object.isFrozen(values.bob));
  assert(Object.isFrozen(values.bob.pet));
  assert(Object.isFrozen(values.chris));
  assert(Object.isFrozen(values.chris.pet));
}
readMe();

require('./theory');