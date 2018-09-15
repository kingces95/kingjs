'use strict';

var freeze = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  'use strict';

  var values = { $freeze = true,
    alice: { $freeze = true,
      pet: 'tiger' 
    },
    bob: { $freeze = true,
      pet: 'snuggles' 
    },
    chris: { $freeze = true,
      pet: 'spike'
    },
  }

  var result = freeze(values);

  assert(Object.isFrozen(result));
  assert('$isFrozen' in result == result);

  assert(Object.isFrozen(result.alice));
  assert('$isFrozen' in result.alice == result);

  assert(Object.isFrozen(result.bob));
  assert('$isFrozen' in result.bob == result);

  assert(Object.isFrozen(result.chris));
  assert('$isFrozen' in result.chris == result);
}
readMe();

require('./theory');