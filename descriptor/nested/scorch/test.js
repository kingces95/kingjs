'use strict';

var scorch = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  'use strict';

  var values = {
    alice: {
      pet: { name: 'tiger' }
    },
    bob: {
      pet: { name: undefined }
    },
  }

  scorch(values, { '*': { pet: null } });

  assert(values.alice.pet.name == 'tiger');
  assert('name' in values.bob.pet == false);
}
readMe();

require('./theory');